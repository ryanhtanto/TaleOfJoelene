import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBD3eocVPPgsLFbCa0QmpZ5ytDUc9XlFr0",
  authDomain: "inventory-taleofjoelene.firebaseapp.com",
  projectId: "inventory-taleofjoelene",
  storageBucket: "inventory-taleofjoelene.appspot.com",
  messagingSenderId: "531137972547",
  appId: "1:531137972547:web:a266151e379828fc57c7f6",
  measurementId: "G-D35MF8L5CV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;