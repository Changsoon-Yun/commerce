import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import AuthHeading from '@/components/auth/AuthHeading.tsx';
import { BrowserRouter } from 'react-router-dom';

describe('AuthHeading 컴포넌트', () => {
  const text = '로그인';

  it('text prop이 올바르게 렌더링되어야 함', () => {
    render(
      <BrowserRouter>
        <AuthHeading text={text} />
      </BrowserRouter>
    );
    const headingText = screen.getByTestId('heading-text');
    expect(headingText).toBeInTheDocument();
    expect(headingText).toHaveTextContent(text);
  });

  it('로고 이미지가 존재하고 alt 속성이 정확해야 함', () => {
    render(
      <BrowserRouter>
        <AuthHeading text={text} />
      </BrowserRouter>
    );
    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/img/logo.jpg');
  });

  it('로고 이미지에 링크가 있는지 확인', () => {
    render(
      <BrowserRouter>
        <AuthHeading text={text} />
      </BrowserRouter>
    );
    const logoLink = screen.getByRole('link', { name: 'logo' });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });
});
