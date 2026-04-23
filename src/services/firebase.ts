import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHwRXmz3w3uF86aj_zcQkJ-1i1ZYhkaYQ",
  authDomain: "webvovsmart.firebaseapp.com",
  projectId: "webvovsmart",
  storageBucket: "webvovsmart.firebasestorage.app",
  messagingSenderId: "275715774883",
  appId: "1:275715774883:web:e9e538bb2c6b786117a216",
  measurementId: "G-FQC9WQWXBJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const loginWithEmail = async (email: string, pass: string) => {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    return cred;
  } catch (error: any) {
    if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
      // For initial easy setup with specific default
      if (email === 'adminvovsmart@webvovsmart.com' && pass === 'adminvovsmart') {
         console.log("Creating default admin account...");
         try {
           const newCred = await createUserWithEmailAndPassword(auth, email, pass);
           // create basic profile in firestore
           await setDoc(doc(db, 'users', newCred.user.uid), {
              email: email,
              role: 'admin',
              displayName: 'Admin User',
              createdAt: serverTimestamp()
           });
           return newCred;
         } catch(e) {
            console.error("Failed to auto-create default auth");
         }
      }
    }
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
  }
};
