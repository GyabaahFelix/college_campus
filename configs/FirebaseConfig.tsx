// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// @ts-ignore
import {getAuth, initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKtYyOpXmFXcSwN93UdOgHkG7IcDTimew",
  authDomain: "college-campus-f2c60.firebaseapp.com",
  projectId: "college-campus-f2c60",
  storageBucket: "college-campus-f2c60.firebasestorage.app",
  messagingSenderId: "175759044759",
  appId: "1:175759044759:web:a6095b5b876d55a818f9d2",
  measurementId: "G-Z8KJTZDJJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=initializeAuth(app, {
    persistence:getReactNativePersistence(ReactNativeAsyncStorage)
});
// const analytics = getAnalytics(app);