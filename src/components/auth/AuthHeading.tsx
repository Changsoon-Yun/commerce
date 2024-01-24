interface AuthHeadingProps {
  text: string;
}
export default function AuthHeading({ text }: AuthHeadingProps) {
  return (
    <>
      <h2 className="scroll-m-20 text-4xl font-semibold tracking-tight first:mt-0 text-center py-20">
        {text}
      </h2>
    </>
  );
}
