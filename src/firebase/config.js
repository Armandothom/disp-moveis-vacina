import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBWAnmU-vBYFJ4uUf6-SMQIEA4fIwLcP2g",
  authDomain: "vacinas-mobile.firebaseapp.com",
  projectId: "vacinas-mobile",
  storageBucket: "vacinas-mobile.appspot.com",
  messagingSenderId: "783781750202",
  appId: "1:783781750202:web:839c6a819b4acb39ba6983"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db}