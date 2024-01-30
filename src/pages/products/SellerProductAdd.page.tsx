import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FormInner from '@/components/auth/FormInner.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Form } from '@/components/ui/form.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productAddFormSchema } from '@/lib/zod/schemas.ts';
import { z } from 'zod';
import { ChangeEvent, useState } from 'react';
import { TiDelete } from 'react-icons/ti';

export default function SellerProductAddPage() {
  const [uploadImages, setUploadImages] = useState<string[]>([]);
  const form = useForm({
    resolver: zodResolver(productAddFormSchema),
    defaultValues: {
      title: '',
      desc: '',
    },
  });

  const addImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const temp = [];
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        const blobImage = URL.createObjectURL(e.target.files[i]);
        temp.push(blobImage);
      }
    }
    setUploadImages([...uploadImages, ...temp]);
  };

  const deleteImageHandler = (targetSrc: string) => {
    setUploadImages(
      uploadImages.filter((src) => {
        return targetSrc != src;
      })
    );
  };

  const submitHandler = async (values: z.infer<typeof productAddFormSchema>) => {
    console.log(values);
  };
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
          <div className="grid w-full max-w-sm items-center gap-1.5 pb-4">
            <Label htmlFor="picture">사진 등록</Label>
            <Input
              className={'hidden'}
              onChange={addImgHandler}
              id="picture"
              type="file"
              multiple={true}
            />
            <p className="text-sm text-muted-foreground">* 이미지는 최소 1장이 필요합니다!</p>
          </div>
          <div className={'flex flex-col'}>
            <div>업로드 될 이미지</div>
            <div className={'flex gap-4'}>
              {uploadImages.map((src) => (
                <div className={'relative  p-3'} key={src}>
                  <div className={'w-24 h-24 border border-zinc-300'}>
                    <img src={src} alt="image" className={'w-full h-full object-cover'} />
                    <button
                      className={'absolute top-0 right-0'}
                      type={'button'}
                      onClick={() => {
                        deleteImageHandler(src);
                      }}>
                      <TiDelete size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
