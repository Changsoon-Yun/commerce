import { Avatar, AvatarImage } from './avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Input } from './input';
import { NavigationMenuItem, navigationMenuTriggerStyle } from './navigation-menu';
import { Link } from 'react-router-dom';
import { useAuth } from '@/apis/useAuth.ts';
import { Button } from './button';

export default function Header() {
  const { storedUserData, logout } = useAuth();
  return (
    <>
      <div className={'flex justify-between px-5 items-center'}>
        <Link to={'/'}>
          <img src="/img/logo.jpg" alt="logo" width={80} height={80} />
        </Link>
        <Input className={'max-w-md'} type="text" placeholder="검색" />
        <div className={'flex gap-4'}>
          {storedUserData ? (
            <DropdownMenu>
              <DropdownMenuTrigger className={'focus-visible:outline-none'}>
                <Avatar>
                  <AvatarImage src="/img/defaultProfileImage.png" />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to={'/user/dashboard'}>내 프로필 보기</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {storedUserData?.isSeller && (
                  <>
                    <DropdownMenuLabel>판매자 메뉴</DropdownMenuLabel>
                    <Link to={'/seller/dashboard'}>
                      <DropdownMenuItem>판매 목록</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={() => logout()}>로그아웃</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NavigationMenuItem className={navigationMenuTriggerStyle() + ' px-0'}>
              <Link to={'/login'}>
                <Button variant={'outline'}>로그인</Button>
              </Link>
            </NavigationMenuItem>
          )}
        </div>
      </div>
    </>
  );
}
