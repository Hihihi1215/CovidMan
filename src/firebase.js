// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8DJAL3kqnbI-vT1c0KWj6KwrT-0IinA4",
  authDomain: "covid-man.firebaseapp.com",
  projectId: "covid-man",
  storageBucket: "covid-man.appspot.com",
  messagingSenderId: "430034293725",
  appId: "1:430034293725:web:fb1519fdb6be2199a21c34",
  measurementId: "G-DR31VVHH4K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Authentication
const auth = getAuth();
export { auth, signInWithEmailAndPassword };

// Firestore
export const db = getFirestore();

// Checking for duplicate id or email from users collection
export const checkDuplicateUser = async (id, email) => {
  const usersRef = collection(db, "users");
  const q1 = query(usersRef, where("IDno", "==", id));
  const q2 = query(usersRef, where("email", "==", email))
  const querySnapshot1 = await getDocs(q1);
  const querySnapshot2 = await getDocs(q2);
  return (querySnapshot1.docs.length > 0 || querySnapshot2.docs.length > 0);
}
