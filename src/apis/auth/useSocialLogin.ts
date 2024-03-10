import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/firebase.ts';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { User } from '@/types/user.ts';
import { handleFirebaseError } from '@/utils/handleFirebaseError.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/apis/auth/useAuth.ts';
import { toastMessage } from '@/constant/toastMessage.ts';

export default function useSocialLogin() {
  const navigate = useNavigate();
  const { setStoredUserData } = useAuth();
  const handleLogin = async (provider: GoogleAuthProvider | GithubAuthProvider) => {
    try {
      const userCredential = await signInWithPopup(auth, provider); // 팝업창 띄워서 로그인

      const uid = userCredential.user.uid;
      const userRef = doc(db, 'users', uid);
      const querySnapshot = await getDoc(userRef);
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

      const updatedUserRef = doc(db, 'users', uid);
      const updatedSnapShot = await getDoc(updatedUserRef);
      localStorage.setItem('user', JSON.stringify(updatedSnapShot.data()));
      setStoredUserData(updatedSnapShot.data() as User);

      toast({
        title: toastMessage.login.title,
        description: toastMessage.login.description,
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
