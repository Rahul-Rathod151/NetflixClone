// =========================================================
// FIREBASE CONFIGURATION
// =========================================================

import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import { getAuth } from
    "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


// Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyBSALnNFg68mSLwKkQdZZ_B5QsyttJGaeI",

    authDomain: "netflix-clone-6ba1e.firebaseapp.com",

    projectId: "netflix-clone-6ba1e",

    storageBucket: "netflix-clone-6ba1e.firebasestorage.app",

    messagingSenderId: "1085051975571",

    appId: "1:1085051975571:web:a04e15ef0a8098b76f1a66",

    measurementId: "G-77CJ1N4FH6"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


// Initialize Authentication

export const auth = getAuth(app);