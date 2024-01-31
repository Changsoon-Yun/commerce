import FormInner from '@/components/auth/FormInner.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Form } from '@/components/ui/form.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productAddFormSchema } from '@/lib/zod/schemas.ts';
import useUpload from '@/apis/useUpload.ts';
import FormFileInner from '@/components/products/FormFileInner.tsx';
import ProductImgList from '@/components/products/ProductImgList.tsx';

export default function SellerProductAddPage() {
  const { submitHandler, addImgHandler, previewImages, deleteImageHandler } = useUpload();
  const form = useForm({
    resolver: zodResolver(productAddFormSchema),
    defaultValues: {
      title: '',
      desc: '',
      imgList: [],
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
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
            등록 하기
          </Button>
        </form>
      </Form>
    </>
  );
}
