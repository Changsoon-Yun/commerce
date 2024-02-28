import { toast } from '@/components/ui/use-toast';
import { FirebaseError } from 'firebase/app';

interface HandleFirebaseErrorType {
  e: unknown;
  toast: typeof toast;
}
export const handleFirebaseError = ({ e, toast }: HandleFirebaseErrorType) => {
  if (e instanceof FirebaseError) {
    toast({
      title: '에러!',
      description: e.code,
      variant: 'destructive',
    });
  }
};
