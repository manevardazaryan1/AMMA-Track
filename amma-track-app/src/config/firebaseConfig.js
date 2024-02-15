import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDLhB_aC4ybR3b3h5bvUeZUROUuS_mjH54",
    authDomain: "amma-track-89dd0.firebaseapp.com",
    projectId: "amma-track-89dd0",
    storageBucket: "amma-track-89dd0.appspot.com",
    messagingSenderId: "487367767220",
    appId: "1:487367767220:web:017001df2d1abea94993e1",
    measurementId: "G-L4LK7NCF9K"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  export { db };