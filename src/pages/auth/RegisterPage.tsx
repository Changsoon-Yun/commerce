import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AuthHeading from '@/components/auth/AuthHeading.tsx';
import { Form } from '@/components/ui/form.tsx';
import FormInner from '@/components/auth/FormInner.tsx';
import { Button } from '@/components/ui/button.tsx';
import { registerFormSchema } from '@/lib/zod/schemas.ts';

export default function RegisterPage() {
  const location = useLocation();
  let visitor: '소비자' | '판매자' | '' = '';
  if (location.pathname === '/register/customer') {
    visitor = '소비자';
  } else {
    visitor = '판매자';
  }

  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      userName: '',
    },
  });

  const submitHandler = (values: z.infer<typeof registerFormSchema>) => {
    console.log(values);
  };
  return (
    <>
      <div className={'pb-6'}>
        <AuthHeading text={`${visitor} 회원가입`} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <FormInner form={form} name={'email'} label={'이메일'} />
            <FormInner form={form} name={'userName'} label={'이름'} />
            <FormInner form={form} name={'password'} label={'비밀번호'} isRegister={true} />
            <Button className={'w-full mt-10 py-6'} type={'submit'}>
              회원가입 하기
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
