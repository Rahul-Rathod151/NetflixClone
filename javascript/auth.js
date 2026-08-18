// =========================================================
// NETFLIX AUTHENTICATION
// =========================================================

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged
} from
    "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import { auth } from "./firebase-config.js";


// =========================================================
// GOOGLE PROVIDER
// =========================================================

const googleProvider =
    new GoogleAuthProvider();


// =========================================================
// SIGN UP
// =========================================================

export async function signupUser(email, password) {

    try {

        const result =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        return {
            success: true,
            user: result.user
        };

    } catch (error) {

        console.error(
            "Signup error:",
            error
        );

        return {
            success: false,
            error: error
        };

    }

}


// =========================================================
// LOGIN
// =========================================================

export async function loginUser(email, password) {

    try {

        const result =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

        return {
            success: true,
            user: result.user
        };

    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        return {
            success: false,
            error: error
        };

    }

}


// =========================================================
// GOOGLE LOGIN
// =========================================================

export async function loginWithGoogle() {

    try {

        const result =
            await signInWithPopup(
                auth,
                googleProvider
            );

        return {
            success: true,
            user: result.user
        };

    } catch (error) {

        console.error(
            "Google login error:",
            error
        );

        return {
            success: false,
            error: error
        };

    }

}


// =========================================================
// FORGOT PASSWORD
// =========================================================

export async function resetPassword(email) {

    try {

        await sendPasswordResetEmail(
            auth,
            email
        );

        return {
            success: true
        };

    } catch (error) {

        console.error(
            "Password reset error:",
            error
        );

        return {
            success: false,
            error: error
        };

    }

}


// =========================================================
// LOGOUT
// =========================================================

export async function logoutUser() {

    try {

        await signOut(auth);

        return {
            success: true
        };

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

        return {
            success: false,
            error: error
        };

    }

}


// =========================================================
// AUTH STATE
// =========================================================

export function watchAuthState(callback) {

    return onAuthStateChanged(
        auth,
        callback
    );

}