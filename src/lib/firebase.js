import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQuI2M1zrw65SfMGfTvEd-PgWW-53oKoE",
  authDomain: "wedding-d3e10.firebaseapp.com",
  projectId: "wedding-d3e10",
  storageBucket: "wedding-d3e10.firebasestorage.app",
  messagingSenderId: "275373531859",
  appId: "1:275373531859:web:a0c1c9666b381598ce2a26",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
