import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

export const firebaseConfig = {
  apiKey: "AIzaSyD_GXP94lv9jkl_inXzX3tkeXHyJo1TOO8",
  authDomain: "braided-society.firebaseapp.com",
  projectId: "braided-society",
  storageBucket: "braided-society.firebasestorage.app",
  messagingSenderId: "521783048660",
  appId: "1:521783048660:web:1b27a95f099f8c23847e41",
  measurementId: "G-9JQ5H0DHML"
};
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app, "braided-society");
export const storage = getStorage(app);
