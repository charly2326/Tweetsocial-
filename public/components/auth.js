import { auth } from "../js/firebaseConfig.js";
import { signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔓 Iniciar sesión con Google
export function setupAuth() {
  const loginBtn = document.getElementById("loginBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        console.log("✅ Sesión iniciada con Google");
      } catch (error) {
        console.error("❌ Error al iniciar sesión:", error);
        alert("Ocurrió un error al iniciar sesión.");
      }
    });
  }
}

