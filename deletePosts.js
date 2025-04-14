const admin = require('firebase-admin');
const cron = require('node-cron');

// Inicializa Firebase Admin con las credenciales de tu cuenta de servicio
const serviceAccount = require('./config/serviceAccountKey.json'); // Asegúrate de que la ruta sea correcta

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Accede a Firestore

// Función para eliminar posts con más de 7 días de antigüedad
const deletePosts = async () => {
  const postsRef = db.collection('posts');
  const snapshot = await postsRef.get();

  const currentDate = new Date();
  const sevenDaysAgo = currentDate.setDate(currentDate.getDate() - 7); // Fecha de hace 7 días

  snapshot.forEach(doc => {
    const postData = doc.data();
    const postTimestamp = postData.timestamp.toDate(); // Convierte el timestamp de Firestore a una fecha JavaScript

    // Verifica si el post tiene más de 7 días
    if (postTimestamp < sevenDaysAgo) {
      doc.ref.delete()
        .then(() => {
          console.log(`Post ${doc.id} eliminado.`);
        })
        .catch(error => {
          console.error(`Error al eliminar el post ${doc.id}: ${error}`);
        });
    } else {
      console.log(`Post ${doc.id} no se eliminó, es más reciente que 7 días.`);
    }
  });
};

// Programa la eliminación de posts cada 7 días (domingo a las 2 AM)
cron.schedule('0 2 * * 0', () => {
  console.log('Eliminando posts con más de 7 días...');
  deletePosts(); // Llama a la función para eliminar los posts
}, {
  scheduled: true,
  timezone: "America/Bogota" // Asegúrate de usar la zona horaria correcta
});

