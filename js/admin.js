// admin.js
import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const bookingsContainer = document.getElementById("bookings");

async function loadBookings() {
  const querySnapshot = await getDocs(collection(db, "bookings"));

  bookingsContainer.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const booking = docSnap.data();

    bookingsContainer.innerHTML += `
      <div class="booking-card">
        <p><strong>Name:</strong> ${booking.fullName}</p>
        <p><strong>Service:</strong> ${booking.service}</p>
        <p><strong>Date:</strong> ${booking.bookingDate}</p>
        <p><a href="${booking.popUrl}" target="_blank">View POP</a></p>
        <p>Status: ${booking.status}</p>
        <button onclick="approveBooking('${docSnap.id}')">Approve</button>
      </div>
    `;
  });
}

window.approveBooking = async (id) => {
  await updateDoc(doc(db, "bookings", id), {
    status: "approved"
  });
  loadBookings();
};

loadBookings();
