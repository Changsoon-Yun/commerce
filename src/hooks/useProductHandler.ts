import { db } from '@/lib/firebase/firebase.ts';
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
import useImage from '@/hooks/useImage.ts';
import { IProducts } from '@/types/product.ts';
import { useState } from 'react';

export type UploadImgListType = { src: string; blob: File }[];

export default function useProductHandler(id?: string) {
  const navigate = useNavigate();
  const { userData, storedUserData } = useAuth();
  const { product } = useGetSellerProduct({ id: id as string });
  const {
    uploadHandler,
    getImageURL,
    addImgHandler,
    previewImages,
    setPreviewImages,
    deleteImageHandler,
  } = useImage(product as IProducts);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (values: z.infer<typeof productFormSchema>) => {
    try {
      setIsLoading(true);
      await uploadHandler(values.title);
      const imageUrlList = await getImageURL(values.title);
      const collectionRef = collection(db, `products`);
      const docRef = await addDoc(collectionRef, {
        uid: userData?.uid,
        sellerEmail: userData?.email,
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
    } finally {
      setIsLoading(false);
    }
  };

  const editHandler = async (values: z.infer<typeof productFormSchema>) => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHandler = async (id: string) => {
    const productRef = doc(db, `products/${id}`);
    if (confirm('삭제 하시겠습니까?')) {
      try {
        await deleteDoc(productRef);
        await queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.PRODUCTS.SELLER(storedUserData?.uid as string),
        });
        toast({
          description: '상품 삭제에 성공 했습니다.',
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
  };

  const updateOrderStatusHandler = async (value: string, id: string) => {
    const productRef = doc(db, `products/${id}`);
    try {
      await updateDoc(productRef, {
        ...product,
        updatedAt: serverTimestamp(),
        orderStatus: value,
      });
      toast({
        description: '주문 상태 수정을 성공 했습니다.',
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
  };

  return {
    isLoading,
    product,
    submitHandler,
    editHandler,
    deleteHandler,
    updateOrderStatusHandler,
    addImgHandler,
    previewImages,
    setPreviewImages,
    deleteImageHandler,
  };
}
