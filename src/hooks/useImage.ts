import { ChangeEvent, useState } from 'react';
import { UploadImgListType } from '@/hooks/useProductHandler.ts';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/firebase.ts';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { IProducts } from '@/types/product.ts';
import { useAuth } from '@/apis/auth/useAuth.ts';
import imageCompression from 'browser-image-compression';
import { compressValues } from '@/constant/compressValues.ts';

export default function useImage(product: IProducts) {
  const { userData } = useAuth();
  const [uploadImages, setUploadImages] = useState<UploadImgListType>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [deleteImages, setDeleteImages] = useState<string[]>([]);
  const addImgHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const uploadImagesTemp: UploadImgListType = [];
    const previewImagesTemp = [];
    if (e.target.files) {
      // 파일 배열 생성
      const files = Array.from(e.target.files);

      // 파일 압축 및 데이터 URL 생성을 위한 Promise 배열 생성
      const compressPromises = files.map(async (file) => {
        const compressedImage = await imageCompression(file, {
          maxSizeMB: compressValues.maxSizeMB,
          maxWidthOrHeight: compressValues.maxWidthOrHeight,
          useWebWorker: true,
        });
        const blobImage = await imageCompression.getDataUrlFromFile(compressedImage);
        return { src: blobImage, blob: compressedImage };
      });
      const compressedImages = await Promise.all(compressPromises);
      const blobImages = compressedImages.map((image) => image.src);

      uploadImagesTemp.push(...compressedImages);
      previewImagesTemp.push(...blobImages);
    }

    setUploadImages([...uploadImages, ...uploadImagesTemp]);
    setPreviewImages([...previewImages, ...previewImagesTemp]);
  };

  const deleteAddedImageHandler = async (id: string) => {
    const promises = deleteImages.map(async (targetSrc) => {
      const decodedFilePath = decodeURIComponent(targetSrc.split('/o/')[1].split('?')[0]);
      const fileRef = ref(storage, decodedFilePath);
      const productRef = doc(db, `products/${id}`);
      const updatedImageList = product?.imageList.filter((src: string) => {
        return src !== targetSrc;
      });

      await deleteObject(fileRef);
      await updateDoc(productRef, {
        ...product,
        imageList: updatedImageList,
        updatedAt: serverTimestamp(),
      });
    });
    await Promise.all(promises);
  };

  const deleteImageHandler = async (targetSrc: string) => {
    setUploadImages(
      uploadImages.filter(({ src }) => {
        return targetSrc != src;
      })
    );
    setPreviewImages(
      previewImages.filter((src) => {
        return targetSrc != src;
      })
    );
    if (targetSrc.startsWith('https://firebasestorage')) {
      setDeleteImages((prev) => [...prev, targetSrc]);
    }
  };

  const uploadHandler = async (title: string) => {
    const promises = uploadImages.map(async (data) => {
      const imageRef = ref(storage, userData?.uid + '/' + title + ` ${data.blob.name}`);
      return await uploadBytes(imageRef, data.blob);
    });
    await Promise.all(promises);
  };

  const getImageURL = async (title: string) => {
    const promises = uploadImages.map(async (data) => {
      const imageRef = ref(storage, userData?.uid + '/' + title + ` ${data.blob.name}`);
      return await getDownloadURL(imageRef);
    });
    return await Promise.all(promises);
  };

  return {
    addImgHandler,
    deleteImageHandler,
    uploadHandler,
    uploadImages,
    setUploadImages,
    setPreviewImages,
    previewImages,
    getImageURL,
    deleteAddedImageHandler,
  };
}
