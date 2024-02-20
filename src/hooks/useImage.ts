import { ChangeEvent, useState } from 'react';
import { UploadImgListType } from '@/hooks/useProductHandler.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/firebase.ts';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { IProducts } from '@/types/product.ts';
import { useAuth } from '@/apis/useAuth.ts';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys.ts';
import imageCompression from 'browser-image-compression';
import { queryClient } from '@/lib/react-query/queryClient.ts';

export default function useImage(product: IProducts) {
  const { userData } = useAuth();
  const [uploadImages, setUploadImages] = useState<UploadImgListType>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const addImgHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const temp: UploadImgListType = [];
    const temp2 = [];
    if (e.target.files) {
      // 파일 배열 생성
      const files = Array.from(e.target.files);

      // 파일 압축 및 데이터 URL 생성을 위한 Promise 배열 생성
      const compressPromises = files.map(async (file) => {
        const compressedImage = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 310,
          useWebWorker: true,
        });
        const blobImage = await imageCompression.getDataUrlFromFile(compressedImage);
        return { src: blobImage, blob: compressedImage };
      });
      const compressedImages = await Promise.all(compressPromises);
      const blobImages = compressedImages.map((image) => image.src);

      temp.push(...compressedImages);
      temp2.push(...blobImages);
    }

    setUploadImages([...uploadImages, ...temp]);
    setPreviewImages([...previewImages, ...temp2]);
  };

  const deleteImageHandler = async (targetSrc: string, id?: string) => {
    if (targetSrc.startsWith('https://firebasestorage')) {
      if (confirm('이미 등록된 사진입니다. \n삭제 하시겠습니까?')) {
        try {
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
          await queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.PRODUCT.SELLER(userData?.uid as string, id as string),
          });
          toast({
            description: '이미지 삭제를 성공 했습니다.',
          });

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
        } catch (e) {
          if (e instanceof FirebaseError) {
            toast({
              title: '에러!',
              description: e.code,
              variant: 'destructive',
            });
          }
        }
      }
    } else {
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
  };
}
