import { auth } from "./firebase.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


export async function registerUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Usuario registrado:", userCredential.user);
        return userCredential.user;
    } catch (error) {
        console.error("Error al registrar:", error.code, error.message);
        throw error;
    }
}

export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Usuario logueado:", userCredential.user);
        return userCredential.user;
    } catch (error) {
        console.error("Error al loguearse:", error.code, error.message);
        throw error;
    }
}

export async function logoutUser() {
    try {
        await signOut(auth);
        console.log("Usuario deslogueado");
    } catch (error) {
        console.error("Error al desloguearse:", error.code, error.message);
        throw error;
    }
}

export function getCurrentUser(callback) {
    return onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Usuario logueado:", user);
            callback(user);
        } else {
            console.log("Usuario deslogueado");
            callback(null);
        }
    });
}
