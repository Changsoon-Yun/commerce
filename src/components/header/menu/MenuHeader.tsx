interface MenuHeaderProps {
  text: string;
}

export default function MenuHeader({ text }: MenuHeaderProps) {
  return (
    <>
      <div className={'p-3 scroll-m-20 text-2xl font-semibold tracking-tight'}>{text}</div>
    </>
  );
}
