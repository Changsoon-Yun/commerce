import { fireEvent, render, screen } from '@testing-library/react';
import SocialLogins from '@/components/auth/SocialLogins.tsx';

describe('SocialLogins 컴포넌트', () => {
  it('구글 로그인 버튼이 클릭되면 handleGoogleLogin 함수가 호출되어야 함', () => {
    const handleGoogleLoginMock = vi.fn();
    render(
      <SocialLogins handleGoogleLogin={handleGoogleLoginMock} handleGithubLogin={async () => {}} />
    );
    const googleButton = screen.getByText('구글로 시작하기');
    fireEvent.click(googleButton);
    expect(handleGoogleLoginMock).toHaveBeenCalled();
  });

  it('카카오 로그인 버튼이 클릭되면 알림창이 뜨는지 확인', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<SocialLogins handleGoogleLogin={async () => {}} handleGithubLogin={async () => {}} />);
    const kakaoButton = screen.getByText('카카오로 시작하기');
    fireEvent.click(kakaoButton);
    expect(alertMock).toHaveBeenCalledWith('현재 준비중인 서비스 입니다');
    alertMock.mockRestore(); // alert를 모의(mock)한 것을 복원
  });

  it('깃허브 로그인 버튼이 클릭되면 handleGithubLogin 함수가 호출되어야 함', () => {
    const handleGithubLoginMock = vi.fn();
    render(
      <SocialLogins handleGoogleLogin={async () => {}} handleGithubLogin={handleGithubLoginMock} />
    );
    const githubButton = screen.getByText('깃허브로 시작하기');
    fireEvent.click(githubButton);
    expect(handleGithubLoginMock).toHaveBeenCalled();
  });
});
