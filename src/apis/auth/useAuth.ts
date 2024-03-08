import { auth, db } from '@/lib/firebase/firebase.ts';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { loginFormSchema, registerFormSchema } from '@/lib/zod/schemas.ts';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast.ts';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys.ts';
import { UserData } from '@/types/user.ts';
import { queryClient } from '@/lib/react-query/queryClient.ts';
import { handleFirebaseError } from '@/utils/handleFirebaseError.ts';
import { toastMessage } from '@/constant/toastMessage.ts';

interface authServerCallProps {
  type: 'register' | 'login';
  data?: z.infer<typeof loginFormSchema> | z.infer<typeof registerFormSchema>;
  isSeller?: boolean;
}

export function useAuth() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [storedUserData, setStoredUserData] = useState<UserData | undefined | null>(
    localStorage.getItem('user') === 'undefined'
      ? null
      : JSON.parse(localStorage.getItem('user') as string)
  );

  const fetchUserInfo = useCallback(async () => {
    const uid = auth.currentUser?.uid || '';
    const q = doc(db, 'users', uid);
    const querySnapshot = await getDoc(q);
    localStorage.setItem('user', JSON.stringify(querySnapshot.data()));
    setStoredUserData(querySnapshot.data() as UserData);
    return querySnapshot.data() as UserData;
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await fetchUserInfo();
        setStoredUserData(userData);
        queryClient.setQueryData(QUERY_KEYS.AUTH.USER(), userData);
      } else {
        setStoredUserData(null);
        queryClient.setQueryData(QUERY_KEYS.AUTH.USER(), null);
      }
    });
  }, [fetchUserInfo]);

  const authServerCall = async ({ type, data, isSeller }: authServerCallProps) => {
    try {
      //회원가입
      if (type == 'register' && data && 'userName' in data) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        const uid = userCredential.user.uid;
        await setDoc(doc(db, 'users', uid), {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          isSeller,
          userName: data.userName,
          profileImg: '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        toast({
          title: toastMessage.register.title,
          description: toastMessage.register.description,
        });
        navigate('/');
      }

      // 로그인
      if (type === 'login' && data) {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        localStorage.setItem('user', JSON.stringify(await fetchUserInfo()));
        toast({
          title: toastMessage.login.title,
          description: toastMessage.login.description,
        });
        navigate('/');
      }
    } catch (e) {
      handleFirebaseError({ e, toast });
    }
  };

  const { data: userData } = useQuery({
    queryKey: QUERY_KEYS.AUTH.USER(),
    queryFn: fetchUserInfo,
    enabled: !!auth.currentUser,
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => signOut(auth),
    onSuccess() {
      queryClient.setQueryData(QUERY_KEYS.AUTH.USER(), null);
      localStorage.removeItem('user');
      navigate('/');
    },
  });

  return {
    storedUserData,
    setStoredUserData,
    authServerCall,
    logout,
    userData,
  };
}
