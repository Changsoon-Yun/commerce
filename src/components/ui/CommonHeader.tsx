import {
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu.tsx';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';

export default function CommonHeader() {
  return (
    <>
      <NavigationMenuItem className={navigationMenuTriggerStyle() + ' px-0'}>
        <Link to={'/login'}>
          <Button variant={'outline'}>로그인</Button>
        </Link>
      </NavigationMenuItem>
    </>
  );
}
