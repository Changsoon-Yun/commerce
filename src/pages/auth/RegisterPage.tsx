import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AuthHeading from '@/components/auth/AuthHeading.tsx';
import { Form, FormField } from '@/components/ui/form.tsx';
import { Button } from '@/components/ui/button.tsx';
import { registerFormSchema } from '@/lib/zod/schemas.ts';
import { useAuth } from '@/apis/auth/useAuth.ts';
import { Metatags } from '@/metadatas/metadatas.tsx';
import Container from '@/components/Container.tsx';
import FormTextInput from '@/components/compound/submission/FormTextInput.tsx';

export default function RegisterPage() {
  const location = useLocation();
  const { authServerCall } = useAuth();

  const isSeller = location.pathname === '/register/seller';

  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      userName: '',
    },
  });

  const submitHandler = async (values: z.infer<typeof registerFormSchema>) => {
    await authServerCall({ type: 'register', data: values, isSeller });
  };

  return (
    <>
      <Metatags title={`Seconds: 중고거래 - 회원가입`} desc={'회원가입 페이지 입니다.'} />
      <Container className={'flex-1'}>
        <AuthHeading text={`회원가입`} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <FormField
              name={'email'}
              render={({ field }) => (
                <FormTextInput
                  label={'이메일'}
                  type={'text'}
                  placeholder={'example@email.com'}
                  field={field}
                />
              )}
            />
            <FormField
              name={'userName'}
              render={({ field }) => (
                <FormTextInput label={'이름'} placeholder={'example@email.com'} field={field} />
              )}
            />
            <FormField
              name={'password'}
              render={({ field }) => (
                <FormTextInput
                  type={'password'}
                  label={'비밀번호'}
                  placeholder={'최소 8글자 이상 대문자, 소문자, 특수문자 1개 포함 입니다.'}
                  field={field}
                />
              )}
            />
            <Button className={'w-full mt-10 py-6'} type={'submit'} data-testid={'register-button'}>
              회원가입 하기
            </Button>
          </form>
        </Form>
      </Container>
    </>
  );
}
