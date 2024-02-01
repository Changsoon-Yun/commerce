import { ChangeEvent, useState } from 'react';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/firebase.ts';
import { z } from 'zod';
import { productFormSchema } from '@/lib/zod/schemas.ts';
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/apis/useAuth.ts';
import useGetSellerProduct from '@/apis/useGetSellerProduct.ts';
import { queryClient } from '@/App.tsx';

export type UploadImgListType = { src: string; blob: File }[];

export default function useProductActions(id?: string) {
  const navigate = useNavigate();
  const { userData, storedUserData } = useAuth();
  const { product } = useGetSellerProduct({ id: id as string });
  const [uploadImages, setUploadImages] = useState<UploadImgListType>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const addImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const temp = [];
    const temp2 = [];
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        const blobImage = URL.createObjectURL(e.target.files[i]);
        temp.push({ src: blobImage, blob: e.target.files[i] });
        temp2.push(blobImage);
      }
    }
    setUploadImages([...uploadImages, ...temp]);
    setPreviewImages([...previewImages, ...temp2]);
  };

  const deleteImageHandler = async (targetSrc: string, id?: string) => {
    if (!targetSrc.startsWith('blob')) {
      if (previewImages.length <= 1) {
        alert('이미지는 최소 1장이 필요합니다.');
        return;
      }
      if (confirm('이미 등록된 사진입니다. \n삭제 하시겠습니까?')) {
        const decodedFilePath = decodeURIComponent(targetSrc.split('/o/')[1].split('?')[0]);
        const fileRef = ref(storage, decodedFilePath);
        const imageListRef = doc(db, `products/${userData?.uid}/products/${id}`);

        const updatedImageList = product?.imageList.filter((src: string) => {
          return src !== targetSrc;
        });

        await deleteObject(fileRef);
        await updateDoc(imageListRef, {
          ...product,
          imageList: updatedImageList,
          updatedAt: serverTimestamp(),
        });
        alert('삭제 완료');
      }
    }
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

  const submitHandler = async (values: z.infer<typeof productFormSchema>) => {
    await uploadHandler(values.title);
    const imageUrlList = await getImageURL(values.title);
    const collectionRef = collection(db, `products`);
    await addDoc(collectionRef, {
      uid: userData?.uid,
      title: values.title,
      desc: values.desc,
      price: +values.price,
      category: values.category,
      condition: values.condition,
      imageList: imageUrlList,
      isSold: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    alert('등록 성공');
    navigate('/seller/dashboard');
  };

  const editHandler = async (values: z.infer<typeof productFormSchema>) => {
    await uploadHandler(values.title);
    const imageUrlList = await getImageURL(values.title);

    const productRef = doc(db, `products/${id}`);
    if (product) {
      await updateDoc(productRef, {
        ...product,
        title: values.title,
        desc: values.desc,
        price: +values.price,
        category: values.category,
        condition: values.condition,
        imageList: [...product.imageList, ...imageUrlList],
        updatedAt: serverTimestamp(),
      });
    }
    alert('수정 완료');
    navigate('/seller/dashboard');
  };

  const deleteHandler = async (id: string) => {
    const productRef = doc(db, `products/${id}`);
    if (confirm('삭제 하시겠습니까?')) {
      await deleteDoc(productRef);
      await queryClient.invalidateQueries({ queryKey: [`products`, storedUserData?.uid] });
      alert('삭제 되었습니다.');
    }
  };

  return {
    addImgHandler,
    deleteImageHandler,
    uploadHandler,
    uploadImages,
    submitHandler,
    setUploadImages,
    setPreviewImages,
    previewImages,
    editHandler,
    deleteHandler,
  };
}
