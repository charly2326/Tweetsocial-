import { db, auth } from "../js/firebaseConfig.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ✅ Publicar nuevo post
export function handlePublish() {
  const publishBtn = document.getElementById("publishBtn");

  if (!publishBtn) return;

  publishBtn.addEventListener("click", async () => {
    const textInput = document.getElementById("postInput");
    const fileInput = document.getElementById("postImageInput");
    const text = textInput.value.trim();
    const file = fileInput.files[0];

    if (!text && !file) {
      return alert("⚠️ Escribe algo o sube una imagen.");
    }

    const user = auth.currentUser;
    if (!user) return alert("Debes iniciar sesión.");

    let mediaURL = "";
    let isVideo = false;

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Tweetsocial");

      isVideo = file.type.startsWith("video/");
      const uploadURL = isVideo
        ? "https://api.cloudinary.com/v1_1/dz70korgo/video/upload"
        : "https://api.cloudinary.com/v1_1/dz70korgo/image/upload";

      const res = await fetch(uploadURL, { method: "POST", body: formData });
      const data = await res.json();
      mediaURL = data.secure_url;
    }

    await addDoc(collection(db, "posts"), {
      uid: user.uid,
      username: user.displayName,
      photoURL: user.photoURL,
      text,
      mediaURL,
      isVideo,
      timestamp: serverTimestamp()
    });

    textInput.value = "";
    fileInput.value = "";
    alert("✅ Publicado con éxito");
  });
}

// 🔁 Cargar posts en tiempo real
export function loadPosts() {
  const postsContainer = document.getElementById("postsContainer");

  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

  onSnapshot(q, (snapshot) => {
    postsContainer.innerHTML = "";

    snapshot.forEach((doc) => {
      const post = doc.data();

      const media = post.mediaURL
        ? post.isVideo
          ? `<video src="${post.mediaURL}" controls class="w-full max-h-60 rounded mt-2"></video>`
          : `<img src="${post.mediaURL}" class="w-full max-h-60 rounded mt-2" />`
        : "";

      const html = `
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="flex items-center space-x-3 mb-2">
            <img src="${post.photoURL}" class="w-10 h-10 rounded-full" alt="user" />
            <span class="font-semibold">@${post.username}</span>
          </div>
          <p class="text-gray-800">${post.text}</p>
          ${media}
        </div>
      `;

      postsContainer.insertAdjacentHTML("beforeend", html);
    });
  });
}

