import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:  import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:  import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};
console.log("API Key:", import.meta.env.VITE_FIREBASE_API_KEY);


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, query, orderBy };
