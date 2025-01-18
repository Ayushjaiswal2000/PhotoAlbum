// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkIwA7L2GlWsFBs6fY9NIrKmSzj28eTCA",
  authDomain: "photo-album-8b2fd.firebaseapp.com",
  projectId: "photo-album-8b2fd",
  storageBucket: "photo-album-8b2fd.appspot.com",
  messagingSenderId: "594885326042",
  appId: "1:594885326042:web:17b8812970b86cc187a1e3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
