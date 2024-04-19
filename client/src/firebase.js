// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'techverse-4bae1.firebaseapp.com',
  projectId: 'techverse-4bae1',
  storageBucket: 'techverse-4bae1.appspot.com',
  messagingSenderId: '380182371388',
  appId: '1:380182371388:web:a719f2df33506c8cc4f739',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
