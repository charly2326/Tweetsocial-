// ✅ Firebase desde CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAwNDRXI62gadPrDls9AkNnjtTijgyeJ8w",
  authDomain: "tweetsocial.firebaseapp.com",
  projectId: "tweetsocial",
  storageBucket: "tweetsocial.appspot.com",
  messagingSenderId: "84273856654",
  appId: "1:84273856654:web:1ce541725d2b48781709df",
  measurementId: "G-PQSEFMQ32K"
};

// 🚀 Inicializa Firebase y exporta
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

