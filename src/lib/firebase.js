import { initializeApp, getApps } from "firebase/app";
import { getAuth, initializeRecaptchaConfig } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

// Force Firebase to use standard reCAPTCHA v3 (NOT Enterprise)
// This prevents the "reCAPTCHA Enterprise site key not found" error
initializeRecaptchaConfig(auth)
    .then(() => {
        // reCAPTCHA config initialized successfully
    })
    .catch((error) => {
        // If Enterprise is not configured, Firebase will fall back to v3 automatically
        console.warn("reCAPTCHA config initialization:", error.message);
    });

export { app, auth };
