import { Metatags } from '@/metadatas/metadatas.tsx';
import Container from '@/components/Container.tsx';
import FormWrapper from '@/components/user/FormWrapper.tsx';

export default function UserDashBoardEditPage() {
  return (
    <>
      <Metatags
        title={`Seconds: 중고거래 - 유저 프로필 수정`}
        desc={'유저 프로필 수정 페이지 입니다.'}
      />
      <div className={'bg-white flex-1'}>
        <Container>
          <FormWrapper isEdit={true} />
        </Container>
      </div>
    </>
  );
}
