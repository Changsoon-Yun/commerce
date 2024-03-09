import { Link } from 'react-router-dom';
import useMenuContext from '@/context/useMenuContext.tsx';

interface MenuLinkProps {
  text: string;
  to: string;
}

export default function MenuLink({ text, to }: MenuLinkProps) {
  const { closeMenuHandler } = useMenuContext();
  return (
    <>
      <div className={'px-5 my-1 hover:bg-zinc-100'} onClick={closeMenuHandler}>
        <Link to={to}>
          <p className="scroll-m-20 py-3 text-lg tracking-tight hover:font-semibold">{text}</p>
        </Link>
      </div>
    </>
  );
}
