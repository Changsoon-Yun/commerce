import { useAuth } from '@/apis/useAuth.ts';
import { Metatags } from '@/metadatas/metadatas.tsx';
import Container from '@/components/Container.tsx';
import useInputChange from '@/hooks/useInputChange.ts';

export default function UserDashBoardPage() {
  const { storedUserData } = useAuth();
  const { isEditing, handleEditClick, handleSaveClick, handleNicknameChange, nickname } =
    useInputChange();

  if (!storedUserData) {
    return;
  }

  return (
    <>
      <Metatags title={`Seconds: 중고거래 - 유저 프로필`} desc={'유저 프로필 페이지 입니다.'} />
      <div className={'bg-white flex-1'}>
        <Container>
          <div className="">
            <div className="flex flex-col">
              {/* 프로필 사진 */}
              <div className={'relative w-full h-0 pb-[100%] rounded-full overflow-hidden'}>
                <img
                  src="/img/defaultProfileImage.png"
                  alt="Profile"
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
              <div>
                <div className={''}>
                  <p className={'py-10'}>닉네임</p>
                  <div className={'flex gap-1'}>
                    {/* 닉네임 */}
                    {isEditing ? (
                      <input
                        type="text"
                        value={nickname}
                        onChange={handleNicknameChange}
                        className="bg-gray-100 flex-1 px-2 py-1 rounded-md focus:outline-none focus:border-blue-300"
                      />
                    ) : (
                      <p className="bg-gray-100 flex-1 px-2 py-1 rounded-md focus:outline-none focus:border-blue-300">
                        {nickname}
                      </p>
                    )}
                    <div className="">
                      {/* 수정 버튼 */}
                      {!isEditing && (
                        <button
                          onClick={handleEditClick}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600">
                          수정
                        </button>
                      )}
                      {/* 저장 버튼 */}
                      {isEditing && (
                        <button
                          onClick={handleSaveClick}
                          className="bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-600">
                          저장
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
