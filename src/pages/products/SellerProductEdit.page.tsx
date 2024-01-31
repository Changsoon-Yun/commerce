import useProductActions from '@/apis/useProductActions.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productAddFormSchema } from '@/lib/zod/schemas.ts';
import { Form } from '@/components/ui/form.tsx';
import FormInner from '@/components/auth/FormInner.tsx';
import { Button } from '@/components/ui/button.tsx';
import ProductImgList from '@/components/products/ProductImgList.tsx';
import { useParams } from 'react-router-dom';
import useGetSellerProduct from '@/apis/useGetSellerProduct.ts';
import { useEffect } from 'react';
import FormFileInner from '@/components/products/FormFileInner.tsx';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@/lib/firebase/firebase';

export default function SellerProductEditPage() {
  const { id } = useParams();
  const { editHandler, addImgHandler, previewImages, setPreviewImages, deleteImageHandler } =
    useProductActions(id);
  const { product } = useGetSellerProduct({ id: id as string });

  const form = useForm({
    resolver: zodResolver(productAddFormSchema),
    defaultValues: {
      title: '',
      desc: '',
      imgList: [],
    },
  });

  useEffect(() => {
    if (product) {
      form.setValue('title', product.title);
      form.setValue('desc', product.desc);
      const temp = [];
      for (let i = 0; i < product.imageList.length; i++) {
        temp.push(product.imageList[i]);
      }
      setPreviewImages(temp);

      // let decodedFilePath = decodeURIComponent(imgUrl.split("/o/")[1].split("?")[0]);
      // let fileRef = ref(storage, decodedFilePath);
      // deleteObject(fileRef)
      //   .then(() => {})
      //   .catch((error) => {});

      const decodedFilePath = decodeURIComponent(
        product.imageList[0].split('/o/')[1].split('?')[0]
      );
      const fileRef = ref(storage, decodedFilePath);
      // console.log(fileRef);

      const getget = async () => {
        const data = await getDownloadURL(fileRef);
        // console.log(data);
        return data;
      };
      getget();
      form.setValue('imgList', []);
    }
  }, [form, product]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(editHandler)}>
          <FormInner
            form={form}
            name={'title'}
            label={'제목'}
            placeholder={'최소 1글자 이상 입니다.'}
          />
          <FormFileInner
            form={form}
            name={'imgList'}
            label={'사진등록'}
            addImgHandler={addImgHandler}
          />
          <ProductImgList previewImages={previewImages} deleteImageHandler={deleteImageHandler} />
          <FormInner
            form={form}
            name={'desc'}
            label={'상세 내용'}
            isTextArea={true}
            placeholder={'최소 1글자 이상입니다.'}
          />
          <Button className={'w-full mt-10 py-6'} type={'submit'}>
            수정 하기
          </Button>
        </form>
      </Form>
    </>
  );
}
