import { FormLabel } from '@/components/ui/form.tsx';

interface FormLabelProps {
  label: string;
}

export default function SubmissionLabel({ label }: FormLabelProps) {
  return (
    <>
      <FormLabel className={'font-black text-black'}>{label}</FormLabel>
    </>
  );
}
