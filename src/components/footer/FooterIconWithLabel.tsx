import { ElementType } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface FooterIconWithLabelProps {
  icon: ElementType;
  exactIcon: ElementType;
  text: string;
  to: string;
}

export default function FooterIconWithLabel({
  icon: Icon,
  exactIcon: ExactIcon,
  text,
  to,
}: FooterIconWithLabelProps) {
  const { pathname } = useLocation();
  return (
    <div>
      <Link to={to} className={'flex flex-col items-center justify-center gap-1 p-3 font-semibold'}>
        {pathname === to ? <ExactIcon size={20} /> : <Icon size={20} />}
        <small>{text}</small>
      </Link>
    </div>
  );
}
