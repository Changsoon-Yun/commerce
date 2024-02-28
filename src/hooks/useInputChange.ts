import { ChangeEvent, useCallback, useState } from 'react';

export default function useInputChange() {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState('John Doe'); // 닉네임 상태

  const handleEditClick = useCallback(() => {
    setIsEditing(true); // 수정 버튼 클릭 시 입력 모드로 변경
  }, []);

  const handleNicknameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value); // 입력된 닉네임 업데이트
  }, []);

  const handleSaveClick = useCallback(() => {
    setIsEditing(false); // 저장 버튼 클릭 시 입력 모드 종료
    // 변경된 닉네임을 저장하거나 서버에 전송하는 등의 작업 수행
  }, []);

  return {
    isEditing,
    handleEditClick,
    handleSaveClick,
    handleNicknameChange,
    nickname,
    setNickname,
  };
}
