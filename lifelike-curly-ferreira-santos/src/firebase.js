import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCQn6Pt93kTS0f4t12EnCexOKUOe6Ng2hk",
    authDomain: "lifelike-curly.firebaseapp.com",
    projectId: "lifelike-curly",
    storageBucket: "lifelike-curly.firebasestorage.app",
    messagingSenderId: "134315702198",
    appId: "1:134315702198:web:1a10522cac532869cf3317"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };