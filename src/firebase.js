import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDLUtApcEwCd_sHVFIwnxpQJqX76id_dtw",
    authDomain: "gymshark-f929b.firebaseapp.com",
    projectId: "gymshark-f929b",
    storageBucket: "gymshark-f929b.appspot.com",
    messagingSenderId: "534550081729",
    appId: "1:534550081729:web:cfb2ca18cd4e70b594a440"
  };

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
