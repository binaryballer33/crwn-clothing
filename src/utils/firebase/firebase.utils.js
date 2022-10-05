// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect,
     signInWithPopup,
    GoogleAuthProvider 
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmjpEP5CtOpB_Cux54fH4_SfR6KShH_rQ",
  authDomain: "crwn-clothing-db-3510a.firebaseapp.com",
  projectId: "crwn-clothing-db-3510a",
  storageBucket: "crwn-clothing-db-3510a.appspot.com",
  messagingSenderId: "755100239337",
  appId: "1:755100239337:web:fa9ef4a7f76fa57bfab778"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    "prompt": "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());
}
