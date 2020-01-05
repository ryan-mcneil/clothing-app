import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDS0aU_9WctlmSHs01hw_l3MB9pEeIQ0Ps",
  authDomain: "clothing-app-12a33.firebaseapp.com",
  databaseURL: "https://clothing-app-12a33.firebaseio.com",
  projectId: "clothing-app-12a33",
  storageBucket: "clothing-app-12a33.appspot.com",
  messagingSenderId: "776824645592",
  appId: "1:776824645592:web:c5f7eaf2e70afec0a534ad",
  measurementId: "G-JYQEWFFEP4"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email }  = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;