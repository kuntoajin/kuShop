import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCckpxWOIlvXKstJlY-0wQ6zjHKHDhSEWU",
  authDomain: "test-a516c.firebaseapp.com",
  projectId: "test-a516c",
  storageBucket: "test-a516c.appspot.com",
  messagingSenderId: "403243907975",
  appId: "1:403243907975:web:972e52dba70905fb273122",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
