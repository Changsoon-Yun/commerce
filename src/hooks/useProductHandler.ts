import { z } from 'zod';
import { productFormSchema } from '@/lib/zod/schemas.ts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/apis/auth/useAuth.ts';
import useGetSellerProduct from '@/apis/useGetSellerProduct.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys.ts';
import useImage from '@/hooks/useImage.ts';
import { Product } from '@/types/product.ts';
import { useState } from 'react';
import { queryClient } from '@/lib/react-query/queryClient.ts';
import { handleFirebaseError } from '@/utils/handleFirebaseError';
import {
  deleteAction,
  editAction,
  submitAction,
  updateOrderStatusAction,
} from '@/lib/firebase/productActions.ts';
import { User } from '@/types/user.ts';
import { toastMessage } from '@/constant/toastMessage.ts';

export type UploadImgListType = { src: string; blob: File }[];

export default function useProductHandler(id?: string) {
  const navigate = useNavigate();
  const { userData, storedUserData } = useAuth();
  const { product } = useGetSellerProduct(id as string);
  const {
    uploadHandler,
    getImageURL,
    addImgHandler,
    previewImages,
    setPreviewImages,
    deleteImageHandler,
    deleteAddedImageHandler,
  } = useImage(product as Product);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (values: z.infer<typeof productFormSchema>) => {
    if (previewImages.length === 0) {
      return alert('이미지는 최소 한장이 필요합니다!');
    }
    try {
      setIsLoading(true);
      await uploadHandler(values.title);
      const imageUrlList = await getImageURL(values.title);
      await submitAction({ userData: userData as User, values, imageUrlList });
      toast({
        description: toastMessage.productAdd.description,
      });
      navigate('/seller/dashboard', { replace: true });
    } catch (e) {
      handleFirebaseError({ e, toast });
    } finally {
      setIsLoading(false);
    }
  };

  const editHandler = async (values: z.infer<typeof productFormSchema>) => {
    if (previewImages.length < 1) {
      return alert('이미지는 최소 한장이 필요합니다.');
    }
    try {
      setIsLoading(true);
      await uploadHandler(values.title);
      await deleteAddedImageHandler(id as string);
      const imageUrlList = await getImageURL(values.title);
      await editAction({ values, imageUrlList, id: id as string });
      toast({
        description: toastMessage.productEdit.description,
      });
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCT.SELLER(userData?.uid as string, id as string),
      });
      navigate('/seller/dashboard');
    } catch (e) {
      handleFirebaseError({ e, toast });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHandler = async (id: string) => {
    if (confirm('삭제 하시겠습니까?')) {
      try {
        await deleteAction({ id });
        await queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.PRODUCTS.SELLER(storedUserData?.uid as string),
        });
        toast({
          description: toastMessage.productDelete.description,
        });
      } catch (e) {
        handleFirebaseError({ e, toast });
      }
    }
  };

  const updateOrderStatusHandler = async (value: string, id: string) => {
    try {
      await updateOrderStatusAction({ value, id, product: product as Product });
      toast({
        description: toastMessage.updateOrderState.description,
      });
    } catch (e) {
      handleFirebaseError({ e, toast });
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
