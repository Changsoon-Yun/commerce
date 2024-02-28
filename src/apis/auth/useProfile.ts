import { ChangeEvent } from 'react';
import { auth } from '@/lib/firebase/firebase.ts';
import imageCompression from 'browser-image-compression';
import { updateProfile } from 'firebase/auth';
import { handleFirebaseError } from '@/utils/handleFirebaseError.ts';
import { toast } from '@/components/ui/use-toast.ts';

export default function useProfile() {
  const updateProfileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (auth.currentUser && e.target.files) {
        const file = e.target.files;
        const compressedImage = await imageCompression(file[0], {
          maxSizeMB: 1,
          maxWidthOrHeight: 310,
          useWebWorker: true,
        });

        const blobImage = await imageCompression.getDataUrlFromFile(compressedImage);
        await updateProfile(auth.currentUser, {
          photoURL: blobImage,
        });
      }
    } catch (e) {
      handleFirebaseError({ e, toast });
    }
  };
  return {
    updateProfileHandler,
  };
}
