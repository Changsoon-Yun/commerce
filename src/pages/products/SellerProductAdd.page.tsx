import FormInner from '@/components/auth/FormInner.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Form } from '@/components/ui/form.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productFormSchema } from '@/lib/zod/schemas.ts';
import useProductActions from '@/apis/useProductActions.ts';
import FormFileInner from '@/components/products/FormFileInner.tsx';
import ProductImgList from '@/components/products/ProductImgList.tsx';
import FormComboxInner from '@/components/products/FormComboxInner.tsx';
import FormRadioGroup from '@/components/products/FormRadioGroup.tsx';

export default function SellerProductAddPage() {
  const { submitHandler, addImgHandler, previewImages, deleteImageHandler } = useProductActions();
  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: '',
      desc: '',
      condition: '',
      price: '0',
      category: '',
      imgList: [],
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <FormFileInner
            form={form}
            name={'imgList'}
            label={'사진등록'}
            addImgHandler={addImgHandler}
          />
          <ProductImgList previewImages={previewImages} deleteImageHandler={deleteImageHandler} />
          <FormInner
            form={form}
            name={'title'}
            label={'제목'}
            placeholder={'최소 1글자 이상 입니다.'}
          />
          <FormInner form={form} name={'price'} label={'가격'} type={'number'} placeholder={'0'} />
          <FormInner
            form={form}
            name={'desc'}
            label={'상세 내용'}
            isTextArea={true}
            placeholder={'최소 1글자 이상입니다.'}
          />
          <FormComboxInner form={form} name={'category'} label={'카테고리'} />
          <FormRadioGroup form={form} name={'condition'} label={'상태'} />
          <Button className={'w-full mt-10 py-6'} type={'submit'}>
            등록 하기
          </Button>
        </form>
      </Form>
    </>
  );
}
