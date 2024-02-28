import { toast, Toast, ToasterToast } from '@/components/ui/use-toast.ts';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { handleFirebaseError } from '@/utils/handleFirebaseError.ts';

const queryErrorHandler = (
  toast: ({ ...props }: Toast) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
  },
  e: unknown
) => {
  handleFirebaseError({ e, toast });
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (e) => queryErrorHandler(toast, e),
  }),
  mutationCache: new MutationCache({
    onError: (e) => queryErrorHandler(toast, e),
  }),
});
