import { auth, db } from '@/lib/firebase/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { loginFormSchema, registerFormSchema } from '@/lib/zod/schemas.ts';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/App.tsx';

interface authServerCallProps {
  type: 'register' | 'login';
  data?: z.infer<typeof loginFormSchema> | z.infer<typeof registerFormSchema>;
  isSeller?: boolean;
}
export function useAuth() {
  const navigate = useNavigate();
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
        });
        alert('회원가입 성공! \n로그인 페이지로 이동합니다!');
        navigate('/login');
      }

      // 로그인
      if (type === 'login' && data) {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        alert('로그인 성공! \n메인 페이지로 이동합니다!');
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  //로그아웃
  const { mutate: logout } = useMutation({
    mutationFn: () => signOut(auth),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const fetchUser = async () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve(!!user);
      });
    });
  };

  // const userInfo = () => {
  //   const obj: Record<string, string> = {};
  //   if (auth.currentUser) {
  //     const { email } = auth.currentUser;
  //     if (email) {
  //       obj.email = email;
  //     }
  //   }
  //   return obj;
  // };
  const fetchUserInfo = async () => {
    const uid = auth.currentUser?.uid || '';
    const q = doc(db, 'users', uid);
    const querySnapshot = await getDoc(q);
    return querySnapshot.data();
  };

  const { data: isLoggedIn } = useQuery({ queryKey: ['user'], queryFn: fetchUser });
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
  });
  return { isLoggedIn, authServerCall, logout, userInfo };
}
