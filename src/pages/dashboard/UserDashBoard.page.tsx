import { useAuth } from '@/apis/auth/useAuth.ts';
import { Metatags } from '@/metadatas/metadatas.tsx';
import Container from '@/components/Container.tsx';
import useInputChange from '@/hooks/useInputChange.ts';
import { Button } from '@/components/ui/button.tsx';
import { MdEdit } from 'react-icons/md';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useProfile from '@/apis/auth/useProfile.ts';

export default function UserDashBoardPage() {
  const { storedUserData } = useAuth();
  const { updateProfileHandler } = useProfile();
  const {
    isEditing,
    handleEditClick,
    handleSaveClick,
    handleNicknameChange,
    nickname,
    setNickname,
  } = useInputChange();
  const navigate = useNavigate();

  useEffect(() => {
    if (storedUserData?.userName) {
      setNickname(storedUserData.userName);
    }
  }, [setNickname, storedUserData]);

  useEffect(() => {
    alert('현재 준비중인 페이지 입니다.');
    navigate('/');
  }, [navigate]);

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
              <div className={'flex justify-center pt-10'}>
                <div className={'relative w-32 h-32 rounded-full'}>
                  <img
                    src={storedUserData.profileImg || '/img/defaultProfileImage.png'}
                    alt="Profile"
                    className="object-cover rounded-full"
                  />
                  <div className={''}>
                    <label
                      htmlFor="profileInput"
                      className={
                        'absolute bottom-1 right-1 rounded-full overflow-hidden border border-zinc-500 p-0.5 flex justify-center items-center bg-white cursor-pointer'
                      }>
                      <MdEdit />
                    </label>
                    <input
                      id={'profileInput'}
                      type={'file'}
                      className={'hidden'}
                      onChange={(e) => {
                        updateProfileHandler(e);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <p className={'pt-10 pb-2'}>닉네임</p>
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
                        <Button
                          onClick={handleEditClick}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600">
                          수정
                        </Button>
                      )}
                      {/* 저장 버튼 */}
                      {isEditing && (
                        <Button
                          onClick={handleSaveClick}
                          className="bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-600">
                          저장
                        </Button>
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
