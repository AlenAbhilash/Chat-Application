import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCsnw-5XbmOLY8pKX-FioiAL_CVQz8pkSA",
    authDomain: "chat-application-23002.firebaseapp.com",
    projectId: "chat-application-23002",
    storageBucket: "chat-application-23002.appspot.com",
    messagingSenderId: "952045929102",
    appId: "1:952045929102:web:ae7fd4cf5767a3520a3fdf",
    measurementId: "G-MCSMD1N9GR"
}; 

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
