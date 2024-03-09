import { Metatags } from '@/metadatas/metadatas.tsx';
import Container from '@/components/Container.tsx';
import FormWrapper from '@/components/user/FormWrapper.tsx';

export default function UserDashBoardPage() {
  return (
    <>
      <Metatags title={`Seconds: 중고거래 - 유저 프로필`} desc={'유저 프로필 페이지 입니다.'} />
      <div className={'bg-white flex-1'}>
        <Container>
          <FormWrapper isEdit={false} />
        </Container>
      </div>
    </>
  );
}
