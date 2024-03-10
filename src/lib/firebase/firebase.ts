// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  Firestore,
  FirestoreDataConverter,
  getFirestore,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const createFirestoreDataConverter = <
  T extends DocumentData,
>(): FirestoreDataConverter<T> => {
  return {
    toFirestore(data: T): DocumentData {
      return data;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot<T>): T {
      return snapshot.data();
    },
  };
};

export const createDocRef = <T extends DocumentData>(
  db: Firestore,
  collectionPath: string,
  docPath?: string
) => {
  if (!docPath) {
    return doc(db, collectionPath).withConverter(createFirestoreDataConverter<T>());
  }
  return doc(db, collectionPath, docPath).withConverter(createFirestoreDataConverter<T>());
};

export const createCollectionRef = <T extends DocumentData>(
  db: Firestore,
  collectionPath: string
): CollectionReference<T> => {
  return collection(db, collectionPath).withConverter(createFirestoreDataConverter<T>());
};
