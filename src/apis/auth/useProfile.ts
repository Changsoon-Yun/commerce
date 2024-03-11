import { ChangeEvent, useEffect, useState } from 'react';
import { handleFirebaseError } from '@/utils/handleFirebaseError.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { useAuth } from '@/apis/auth/useAuth.ts';
import { z } from 'zod';
import { profileSchema } from '@/lib/zod/schemas.ts';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/firebase.ts';
import { doc, updateDoc } from 'firebase/firestore/lite';
import { toastMessage } from '@/constant/toastMessage.ts';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/lib/react-query/queryClient.ts';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys.ts';

export default function useProfile() {
  const navigate = useNavigate();
  const { userData, storedUserData, fetchUserInfo } = useAuth();
  const [profileImage, setProfileImage] = useState('');
  const [uploadProfileImage, setUploadProfileImage] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const imageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const blobImage = URL.createObjectURL(e.target.files[0]);
      setProfileImage(blobImage);
      setUploadProfileImage(e.target.files[0]);
    }
  };

  const updateProfileHandler = async (values: z.infer<typeof profileSchema>) => {
    try {
      if (!uploadProfileImage && !profileImage) {
        alert('이미지를 등록해 주세요.');
        return;
      }
      if (!userData) {
        return;
      }
      const imageRef = ref(
        storage,
        userData.uid + '/' + 'profile' + ` ${uploadProfileImage?.name}`
      );
      await uploadBytes(imageRef, uploadProfileImage as File);
      const updatedImageRef = ref(
        storage,
        userData.uid + '/' + 'profile' + ` ${uploadProfileImage?.name}`
      );
      const updatedImg = await getDownloadURL(updatedImageRef);
      const userRef = doc(db, `users/${userData.uid}`);
      await updateDoc(userRef, {
        profileImg: uploadProfileImage ? updatedImg : profileImage,
        userName: values.userName,
      });
      toast({ description: toastMessage.profile.description });
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH.USER() });
      await fetchUserInfo();
      navigate('/user/dashboard', { replace: true });
    } catch (e) {
      handleFirebaseError({ e, toast });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (storedUserData) {
      setProfileImage(storedUserData.profileImg);
    }
  }, [storedUserData, userData]);

  return {
    profileImage,
    storedUserData,
    updateProfileHandler,
    imageChangeHandler,
    userData,
    isLoading,
  };
}
