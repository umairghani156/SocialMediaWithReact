import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getStorage,ref, uploadBytesResumable, getDownloadURL , uploadBytes, } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDnjNRjq583w2mqTLEPEgItZkUrHVN7SBA",
  authDomain: "first-frontend-project-da025.firebaseapp.com",
  projectId: "first-frontend-project-da025",
  storageBucket: "first-frontend-project-da025.appspot.com",
  messagingSenderId: "796702314001",
  appId: "1:796702314001:web:573192cd76c55c62b36bb0",
  measurementId: "G-9BVN24D0BP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export {app, auth, storage, ref, uploadBytesResumable,uploadBytes, getDownloadURL}
