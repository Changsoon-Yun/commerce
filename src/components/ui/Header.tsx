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

export default function Header() {
  return (
    <>
      <div className={'flex justify-between px-20 py-2 items-center'}>
        <img src="/img/git-logo.png" alt="logo" width={40} height={20} />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <Link to={'/login'}>login</Link>
            </NavigationMenuItem>
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <Link to={'/mypage'}>My Page</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className={'flex gap-4'}>
          <Input className={'max-w-md'} type="text" placeholder="검색" />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
