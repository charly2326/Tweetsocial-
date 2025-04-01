import { auth } from "./firebaseConfig.js";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { db } from "./firebaseConfig.js";
import { loadPosts, handlePublish } from "../components/posts.js";
import { setupAuth } from "../components/auth.js";

// 🔐 Verifica si hay usuario activo
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ Usuario activo:", user.displayName);
    document.getElementById("authSection").classList.add("hidden");
    document.getElementById("createPostSection").classList.remove("hidden");

    loadPosts(); // Cargar posts al iniciar sesión
  } else {
    console.log("🔒 Usuario no logueado");
    document.getElementById("authSection").classList.remove("hidden");
    document.getElementById("createPostSection").classList.add("hidden");
  }
});

// ▶️ Inicializa lógica de login y publicar
setupAuth();
handlePublish();

