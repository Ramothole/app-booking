// booking.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { db, storage } from "./firebase.js";



// 🎯 Handle booking form
document
  .getElementById("bookingForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Get form values
      const fullName = document.getElementById("fullName").value;
      const phone = document.getElementById("phone").value;
      const service = document.getElementById("service").value;
      const bookingDate = document.getElementById("date").value;
      const file = document.getElementById("pop").files[0];

      // 2️⃣ Upload proof of payment
      const storageRef = ref(
        storage,
        `proof_of_payment/${Date.now()}_${file.name}`
      );

      await uploadBytes(storageRef, file);
      const popUrl = await getDownloadURL(storageRef);

      // 3️⃣ Save booking to Firestore
      await addDoc(collection(db, "bookings"), {
        fullName,
        phone,
        service,
        bookingDate,
        popUrl,
        status: "pending",
        createdAt: serverTimestamp()
      });

      // 4️⃣ Auto WhatsApp message
      const message = `Hi 👋 I just made a booking!

Name: ${fullName}
Service: ${service}
Date: ${bookingDate}

Proof of payment uploaded ✅`;

      window.location.href =
        "https://wa.me/27718767748?text=" +
        encodeURIComponent(message);

    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong. Please try again.");
    }
  });
