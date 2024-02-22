interface CardTitleProps {
  title: string;
}

export default function CardTitle({ title }: CardTitleProps) {
  return (
    <>
      <h3
        data-testid={'product-title'}
        className="scroll-m-20 h-[56px] text-lg tracking-tight line-clamp-2">
        {title}
      </h3>
    </>
  );
}
