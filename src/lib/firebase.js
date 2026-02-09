import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDda5oTHKom1Jk1Kx8GuNCxU5dJKF0IbE0",
    authDomain: "ansari-matrimony.firebaseapp.com",
    projectId: "ansari-matrimony",
    storageBucket: "ansari-matrimony.firebasestorage.app",
    messagingSenderId: "781772137282",
    appId: "1:781772137282:web:de4010c2736467071f1edb",
    measurementId: "G-Y68JHPX57C"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { auth };
