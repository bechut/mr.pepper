import { getApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getMessaging, Messaging } from "firebase/messaging";
import { getStorage, FirebaseStorage } from "firebase/storage";

const env = import.meta.env;

const firebaseConfig = {
    apiKey: env["VITE_FIREBASE_API_KEY"],
    authDomain: env["VITE_FIREBASE_AUTH_DOMAIN"],
    projectId: env["VITE_FIREBASE_PROJECT_ID"],
    storageBucket: env["VITE_FIREBASE_STORAGE_BUCKET"],
    messagingSenderId: env["VITE_FIREBASE_MESSAGE_SEND_ID"],
    appId: env["VITE_FIREBASE_APP_ID"],
    measurementId: env["VITE_MEASUREMENT_ID"],
};

initializeApp(firebaseConfig);

export const auth: Auth = getAuth(getApp())
export const store: Firestore = getFirestore(getApp())
export const messaging: Messaging = getMessaging(getApp())
export const storage: FirebaseStorage = getStorage(getApp());