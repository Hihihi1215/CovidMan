// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { sendEmail } from "./emailjs";
import { getStorage, ref, uploadBytes } from "firebase/storage";
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

// Users Reference
const usersRef = collection(db, "users");

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

const uploadFiles = (id, files) => {
  files.forEach((file, index) => {
    var fileRef = ref(storage, `${id}/${file.name}`);
    uploadBytes(fileRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  })
}


// Checking for duplicate id or email from users collection
export const checkDuplicateUser = async (id, email) => {
  const q1 = query(usersRef, where("IDno", "==", id));
  const q2 = query(usersRef, where("email", "==", email))
  const querySnapshot1 = await getDocs(q1);
  const querySnapshot2 = await getDocs(q2);
  if(querySnapshot1.docs.length > 0){
    return 'id';
  } else if(querySnapshot2.docs.length > 0){
    return 'email';
  } else {
    return false;
  }
}

const addUser = async (name, id, income, email, mobileNo, address, password, uid) => {
  await setDoc(doc(db, "users", uid), {
    IDno: id,
    email: email,
    fullname: name,
    householdIncome: income,
    mobileNo: mobileNo,
    orgID: "adqdqwqw",
    password: password,
    residentialAddress: address,
    userType: "aidApplicant",
    username: password
  });
}

// Registering an Aid Applicant
export const createAidApplicant = (name, id, income, email, mobileNo, address, files) => {
  const indexOfAt = email.indexOf("@");
  const password = email.substring(0, indexOfAt);
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      addUser(name, id, income, email, mobileNo, address, password, uid);
      uploadFiles(id, files);

      sendEmail(name, password, password, email)
        .then((res) => {
          console.log('Please check your mail box for your username and password');
        })
      // Signed in 
      // const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
}
