import { toast, Toast, ToasterToast } from '@/components/ui/use-toast.ts';
import { FirebaseError } from 'firebase/app';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

const queryErrorHandler = (
  toast: ({ ...props }: Toast) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
  },
  e: unknown
) => {
  if (e instanceof FirebaseError) {
    return toast({
      title: '에러!',
      description: e.code,
      variant: 'destructive',
    });
  }
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (e) => queryErrorHandler(toast, e),
  }),
  mutationCache: new MutationCache({
    onError: (e) => queryErrorHandler(toast, e),
  }),
});
