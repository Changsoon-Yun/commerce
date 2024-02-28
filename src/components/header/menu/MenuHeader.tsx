interface MenuHeaderProps {
  text: string;
}

export default function MenuHeader({ text }: MenuHeaderProps) {
  return (
    <>
      <div className={'p-2 scroll-m-20 text-lg font-semibold tracking-tight'}>{text}</div>
    </>
  );
}
