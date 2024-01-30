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
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './navigation-menu';
import { Link } from 'react-router-dom';
import { useAuth } from '@/apis/useAuth.ts';

export default function Header() {
  const { storedUserData, logout } = useAuth();
  return (
    <>
      <div className={'flex justify-between px-20 py-2 items-center'}>
        <img src="/img/git-logo.png" alt="logo" width={40} height={20} />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <Link to={'/'}>My Page</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className={'flex gap-4'}>
          <Input className={'max-w-md'} type="text" placeholder="검색" />
          {storedUserData ? (
            <DropdownMenu>
              <DropdownMenuTrigger className={'focus-visible:outline-none'}>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <Link to={'/user/dashboard'}>{storedUserData?.email}</Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>로그아웃</DropdownMenuItem>
                <Link to={'/seller/dashboard'}>
                  <DropdownMenuItem>
                    {storedUserData?.isSeller && '판매자 페이지 이동'}
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <Link to={'/login'}>login</Link>
            </NavigationMenuItem>
          )}
        </div>
      </div>
    </>
  );
}
