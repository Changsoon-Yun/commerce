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
import { FirebaseError } from 'firebase/app';
import { toast } from '@/components/ui/use-toast.ts';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys.ts';

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
        toast({
          title: '에러!',
          description: '이미지는 최소 한장이 필요합니다',
          variant: 'destructive',
        });
        return;
      }
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
          toast({
            description: '이미지 삭제를 성공 했습니다.',
          });
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
    try {
      await uploadHandler(values.title);
      const imageUrlList = await getImageURL(values.title);
      const collectionRef = collection(db, `products`);
      const docRef = await addDoc(collectionRef, {
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
      const productRef = doc(db, `products/${docRef.id}`);
      await updateDoc(productRef, {
        id: docRef.id,
      });
      toast({
        description: '상품 등록을 성공 했습니다. 이전 페이지로 이동합니다.',
      });
      navigate('/seller/dashboard');
    } catch (e) {
      if (e instanceof FirebaseError) {
        toast({
          title: '에러!',
          description: e.code,
          variant: 'destructive',
        });
      }
    }
  };

  const editHandler = async (values: z.infer<typeof productFormSchema>) => {
    try {
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
      toast({
        description: '상품 수정을 성공 했습니다. 이전 페이지로 이동합니다.',
      });
      navigate('/seller/dashboard');
    } catch (e) {
      if (e instanceof FirebaseError) {
        toast({
          title: '에러!',
          description: e.code,
          variant: 'destructive',
        });
      }
    }
  };

  const deleteHandler = async (id: string) => {
    const productRef = doc(db, `products/${id}`);
    if (confirm('삭제 하시겠습니까?')) {
      await deleteDoc(productRef);
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCTS.SELLER(storedUserData?.uid),
      });
      toast({
        description: '상품 삭제에 성공 했습니다.',
      });
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
