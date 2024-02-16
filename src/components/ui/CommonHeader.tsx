import {
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu.tsx';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';

export default function CommonHeader() {
  return (
    <>
      <NavigationMenuItem className={navigationMenuTriggerStyle() + ' px-0 bg-transparent'}>
        <Link to={'/login'}>
          <Button data-cy={'to-login'} variant={'outline'}>
            로그인
          </Button>
        </Link>
      </NavigationMenuItem>
    </>
  );
}
