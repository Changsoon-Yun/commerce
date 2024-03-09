import { Button } from '@/components/ui/button.tsx';
import { useNavigate } from 'react-router-dom';
import useProfile from '@/apis/auth/useProfile.ts';
import { Form } from '@/components/ui/form.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '@/lib/zod/schemas.ts';
import FormProfileImage from '@/components/user/FormProfileImage.tsx';
import { z } from 'zod';
import FormUserName from '@/components/user/FormUserName.tsx';

interface UserDashboardWrapperProps {
  isEdit: boolean;
}

export default function FormWrapper({ isEdit }: UserDashboardWrapperProps) {
  const navigate = useNavigate();
  const { updateProfileHandler, profileImage, isLoading, imageChangeHandler, storedUserData } =
    useProfile();

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      profileImg: profileImage,
      userName: storedUserData?.userName ?? '',
    },
  });

  const submitHandler = async (values: z.infer<typeof profileSchema>) => {
    await updateProfileHandler(values);
  };

  return (
    <>
      <div className={'py-10'}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <FormProfileImage
              form={form}
              name={'profileImg'}
              addImgHandler={imageChangeHandler}
              profileImage={profileImage}
              isEdit={isEdit}
            />
            <FormUserName form={form} name={'userName'} label={'닉네임'} isEdit={isEdit} />
            {isEdit ? (
              <Button className={'w-full mt-10 py-6'} type={'submit'} disabled={isLoading}>
                수정완료
              </Button>
            ) : (
              <Button
                onClick={() => navigate('/user/dashboard/edit')}
                className={'w-full mt-10 py-6'}
                type={'button'}>
                수정하러 가기
              </Button>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}
