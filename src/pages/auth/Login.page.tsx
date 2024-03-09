import { Form, FormField } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button.tsx';
import SocialLogins from '@/components/auth/SocialLogins.tsx';
import { Link } from 'react-router-dom';
import AuthHeading from '@/components/auth/AuthHeading.tsx';
import { loginFormSchema } from '@/lib/zod/schemas.ts';
import { useAuth } from '@/apis/auth/useAuth.ts';
import { Metatags } from '@/metadatas/metadatas.tsx';
import Container from '@/components/Container.tsx';
import useSocialLogin from '@/apis/auth/useSocialLogin.ts';
import { Submission } from '@/components/compound/submission';

export default function LoginPage() {
  const { authServerCall } = useAuth();
  const { handleGoogleLogin, handleGithubLogin } = useSocialLogin();
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submitHandler = async (values: z.infer<typeof loginFormSchema>) => {
    await authServerCall({ type: 'login', data: values });
  };
  return (
    <>
      <Metatags title={`Seconds: 중고거래 - 로그인`} desc={'로그인 페이지 입니다.'} />
      <div className={'pb-6 bg-white'}>
        <Container>
          <AuthHeading text={'로그인'} />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)}>
              <FormField
                name={'email'}
                render={({ field }) => (
                  <Submission.Root>
                    <Submission.Label label={'이메일'} />
                    <Submission.Content>
                      <Submission.Input placeholder={'example@email.com'} field={field} />
                    </Submission.Content>
                  </Submission.Root>
                )}
              />
              <FormField
                name={'password'}
                render={({ field }) => (
                  <Submission.Root>
                    <Submission.Label label={'비밀번호'} />
                    <Submission.Content>
                      <Submission.Input
                        placeholder={'최소 8글자 이상 대문자, 소문자, 특수문자 1개 포함 입니다.'}
                        type={'password'}
                        field={field}
                      />
                    </Submission.Content>
                  </Submission.Root>
                )}
              />
              <Button data-testid={'login-button'} className={'w-full mt-10 py-6'} type={'submit'}>
                로그인 하기
              </Button>
            </form>
            <p className={'text-center mt-8 text-sm text-zinc-600'}>
              계정이 없으신가요?
              <span className={'text-blue-600 hover:opacity-80 transition'}>
                <Link to={'/register/seller'} data-testid={'link-to-register'} className={'pl-1'}>
                  회원가입 하기
                </Link>
              </span>
            </p>
            <SocialLogins
              handleGoogleLogin={handleGoogleLogin}
              handleGithubLogin={handleGithubLogin}
            />
          </Form>
        </Container>
      </div>
    </>
  );
}
