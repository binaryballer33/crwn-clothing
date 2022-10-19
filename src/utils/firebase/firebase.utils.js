// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
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

// Initialize Firebase, the comment below will supress the console warning for not using firebaseApp
// eslint-disable-next-line
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    // get the docRef by providing it with the collectionRef and the name of the document
    const docRef = doc(collectionRef, object.title.toLowerCase());
    // batch.set will create the document if it doesn't already exist
    batch.set(docRef, object);
  })

  // Commits all of the writes in this write batch as a single atomic unit.
  await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const firestoreQuery = query(collectionRef);
  const querySnapshot = await getDocs(firestoreQuery);

  // querySnapshot.docs is a array of items
  const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot) => {
    // how did he know about this data() method!!!
    // read the docs
    // https://firebase.google.com/docs/reference/js/v8/firebase.firestore.QueryDocumentSnapshot#data
    const { title, items  } = docSnapshot.data();
    accumulator[title.toLowerCase()] = items;
    return accumulator;
  }, {})

  return categoryMap;
}

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

export const signInAuthWithUserEmailAndPassword = async (email, password) => {
  // if email or password are false, return null
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => {
  await signOut(auth);
}

// everytime a auth state change ocurrs, run this callback
// this is just a permanent listener for auth changes
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);