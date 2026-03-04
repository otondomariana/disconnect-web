import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyACRQs5YlpWL8XKSQPSH0Cj_dcM3mUVxJM",
    authDomain: "disconnect-ff073.firebaseapp.com",
    databaseURL: "https://disconnect-ff073-default-rtdb.firebaseio.com",
    projectId: "disconnect-ff073",
    storageBucket: "disconnect-ff073.firebasestorage.app",
    messagingSenderId: "275539843435",
    appId: "1:275539843435:web:0bde254af198b2e5b1942e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
