import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBp9b2KJlf9UB2TyDJAPFm1NNtmCdPkDYU",
  authDomain: "ai-wastage.firebaseapp.com",
  projectId: "ai-wastage",
  storageBucket: "ai-wastage.firebasestorage.app",
  messagingSenderId: "963243989620",
  appId: "1:963243989620:web:150ca7b819b7015e5c0f21",
  measurementId: "G-K2XJKQ2TR2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export default app;