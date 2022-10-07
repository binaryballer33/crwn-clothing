// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword   
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


// working with the firebase authentication
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    "prompt": "select_account"
})

// keeps track of the authentication state for the entire app
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);


// working with the firebase firestore database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // if user data doesn't exists
  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (error) {
      console.log("There was a error creating the user", error.message);
    }

  } 

  // if user data exists then return userDocRef
  return userDocRef;
}

export const createAuthWithUserEmailAndPassword = async (email, password) => {
  // if email or password are false, return null
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}
