// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6RgvHpdV6QY5rWczEOyrm78g8Xy74zCo",
  authDomain: "the-blog-d5755.firebaseapp.com",
  projectId: "the-blog-d5755",
  storageBucket: "the-blog-d5755.firebasestorage.app",
  messagingSenderId: "98763546658",
  appId: "1:98763546658:web:0b8b41fc8d8d127e00ea7b",
  measurementId: "G-31J1CPGLHX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);