// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { sendEmail } from "./emailjs";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { passwordGenerator } from "./PasswordGenerator";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwFXDoXV-9rGfnP0aGhZB0r-U2ecFAhaE",
  authDomain: "covid-man-e9d5d.firebaseapp.com",
  projectId: "covid-man-e9d5d",
  storageBucket: "covid-man-e9d5d.appspot.com",
  messagingSenderId: "99427361084",
  appId: "1:99427361084:web:1e1fd66d7cdc1568dbfe39",
  measurementId: "G-N4HFBY9HKX"
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

const addAidApplicant = async (name, id, income, email, mobileNo, address, password, uid, orgDocID) => {
  await setDoc(doc(db, "users", uid), {
    IDno: id,
    email: email,
    fullname: name,
    householdIncome: income,
    mobileNo: mobileNo,
    password: password,
    residentialAddress: address,
    userType: "aidApplicant",
    username: email,
    orgDocID : orgDocID
  });
}

export const getUserByUID = async (uid) => {
  const docRef = doc(db, "users", uid)
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

export const getOrgByDocID = async (orgDocID) => {
  const docRef = doc(db, "organisations", orgDocID)
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

const addAidApplicantToOrg = async (orgDocID, uid) => {

  const orgRef = doc(db, "organisations", orgDocID)
  await updateDoc(orgRef, {
    aidApplicants : arrayUnion(uid)
  });
}

// Jen Password Generator
// var jen = new Jen(true, true);

// Registering an Aid Applicant
export const createAidApplicant = (name, id, income, email, mobileNo, address, files, orgDocID) => {
  // const password = jen.password(30);
  const password = passwordGenerator();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      addAidApplicant(name, id, income, email, mobileNo, address, password, uid, orgDocID);
      uploadFiles(uid, files);
      addAidApplicantToOrg(orgDocID, uid);

      sendEmail(name, email, password, email)
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
      console.log(error.code + " " + errorMessage);
      // ..
    });
}
