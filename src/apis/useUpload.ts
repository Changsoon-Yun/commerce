import { ChangeEvent, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/firebase.ts';
import { z } from 'zod';
import { productAddFormSchema } from '@/lib/zod/schemas.ts';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/apis/useAuth.ts';

type UploadImgListType = { src: string; blob: File }[];

export default function useUpload() {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [uploadImages, setUploadImages] = useState<UploadImgListType>([]);
  const addImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const temp = [];
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        const blobImage = URL.createObjectURL(e.target.files[i]);
        temp.push({ src: blobImage, blob: e.target.files[i] });
      }
    }
    setUploadImages([...uploadImages, ...temp]);
  };

  const deleteImageHandler = (targetSrc: string) => {
    setUploadImages(
      uploadImages.filter(({ src }) => {
        return targetSrc != src;
      })
    );
  };

  const uploadHandler = async (title: string) => {
    const promises = uploadImages.map(async (data) => {
      const imageRef = ref(storage, userInfo?.uid + '/' + title + ` ${data.blob.name}`);
      return await uploadBytes(imageRef, data.blob);
    });
    await Promise.all(promises);
  };

  const getImageURL = async (title: string) => {
    const promises = uploadImages.map(async (data) => {
      const imageRef = ref(storage, userInfo?.uid + '/' + title + ` ${data.blob.name}`);
      return await getDownloadURL(imageRef);
    });
    return await Promise.all(promises);
  };

  const submitHandler = async (values: z.infer<typeof productAddFormSchema>) => {
    await uploadHandler(values.title);
    const imageUrlList = await getImageURL(values.title);

    await setDoc(doc(db, `products/${userInfo?.uid}/items`, `${values.title + ' ' + Date.now()}`), {
      uid: userInfo?.uid,
      title: values.title,
      desc: values.desc,
      imageList: imageUrlList,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    alert('등록 성공');
    navigate('/seller/dashboard');
  };

  return {
    addImgHandler,
    deleteImageHandler,
    uploadHandler,
    uploadImages,
    submitHandler,
  };
}
