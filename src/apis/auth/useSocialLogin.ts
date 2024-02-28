import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/firebase.ts';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { UserData } from '@/types/user.ts';
import { handleFirebaseError } from '@/utils/handleFirebaseError.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/apis/auth/useAuth.ts';

export default function useSocialLogin() {
  const navigate = useNavigate();
  const { setStoredUserData } = useAuth();
  const handleLogin = async (provider: GoogleAuthProvider | GithubAuthProvider) => {
    try {
      const userCredential = await signInWithPopup(auth, provider); // 팝업창 띄워서 로그인

      const uid = userCredential.user.uid;
      const q = doc(db, 'users', uid);
      const querySnapshot = await getDoc(q);
      if (!querySnapshot.data()) {
        await setDoc(doc(db, 'users', uid), {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          isSeller: true,
          userName: userCredential.user.email,
          profileImg: userCredential.user.photoURL,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      const q2 = doc(db, 'users', uid);
      const querySnapshot2 = await getDoc(q2);
      localStorage.setItem('user', JSON.stringify(querySnapshot2.data()));
      setStoredUserData(querySnapshot2.data() as UserData);

      toast({
        title: '로그인 성공!',
        description: '메인 페이지로 이동합니다!',
      });
      navigate('/');
    } catch (e) {
      handleFirebaseError({ e, toast });
    }
  };
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider(); // provider 구글 설정
    await handleLogin(provider);
  };

  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider(); // provider 깃허브 설정
    await handleLogin(provider);
  };

  return {
    handleGoogleLogin,
    handleGithubLogin,
  };
}
