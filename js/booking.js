import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

import { db, storage } from "./firebase.js";

document
  .getElementById("bookingForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    try {

      const fullName = document.getElementById("fullName").value;
      const phone = document.getElementById("phone").value;
      const service = document.getElementById("service").value;
      const bookingDate = document.getElementById("date").value;
      const file = document.getElementById("pop").files[0];

      // 🔎 CHECK IF DATE ALREADY CONFIRMED
      const confirmed = await getDocs(collection(db, "confirmedDates"));

      let taken = false;

      confirmed.forEach(doc => {
        const d = doc.data();
        if (d.date === bookingDate) {
          taken = true;
        }
      });

      if (taken) {
        alert("This date is already fully booked.");
        return;
      }

      // 📤 Upload POP
      const storageRef = ref(
        storage,
        `proof-of-payments/${Date.now()}_${file.name}`
      );

      await uploadBytes(storageRef, file);
      const popUrl = await getDownloadURL(storageRef);

      // 💾 Save booking
      await addDoc(collection(db, "bookings"), {
        fullName,
        phone,
        service,
        bookingDate,
        popUrl,
        status: "pending",
        createdAt: serverTimestamp()
      });

      // 📲 WhatsApp message
      const message = `
Hi 👋 I just made a booking!

Name: ${fullName}
Service: ${service}
Date: ${bookingDate}
`;

      const encoded = encodeURIComponent(message);

      window.location.href =
        `https://wa.me/27718767748?text=${encoded}`;

    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong. Please try again.");
    }
  });