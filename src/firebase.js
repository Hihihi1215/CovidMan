// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { sendEmail } from "./emailjs";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQY_1-Wb8Kl_i3MvjNEOQertpZ_bRt_B4",
  authDomain: "covid-man-a9a98.firebaseapp.com",
  projectId: "covid-man-a9a98",
  storageBucket: "covid-man-a9a98.appspot.com",
  messagingSenderId: "338516074338",
  appId: "1:338516074338:web:49a4a3c6aa41364c99563b",
  measurementId: "G-373LKM4X4W"
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
    username: password,
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

// Registering an Aid Applicant
export const createAidApplicant = (name, id, income, email, mobileNo, address, files, orgDocID) => {
  const indexOfAt = email.indexOf("@");
  const password = email.substring(0, indexOfAt);
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      addAidApplicant(name, id, income, email, mobileNo, address, password, uid, orgDocID);
      uploadFiles(uid, files);
      console.log('hi');
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
