import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { db } from "./firebase.js";

export const auth = getAuth(db);

export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function protectPage() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "/login.html";
    }
  });
}

export function logout() {
  signOut(auth).then(() => {
    window.location.href = "/login.html";
  });
}
