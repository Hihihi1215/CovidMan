// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
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

//Organization Reference
const orgRef = collection(db, "organisations")

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

export const checkDuplicateOrganization = async (orgName) =>{
  const q1 = query(orgRef, where("orgName", "==", orgName));
  const querySnapshot1 = await getDocs(q1);
  if(querySnapshot1.docs.length > 0){
    return 'orgName';
  }else{
    return false
  }
}

export const checkDuplicateOrgRep = async (username, email) => {
  const q1 = query(usersRef, where("username", "==", username));
  const q2 = query(usersRef, where("email", "==", email));
  const querySnapshot1 = await getDocs(q1);
  const querySnapshot2 = await getDocs(q2);
  if(querySnapshot1.docs.length > 0){
    return 'username';
  } else if(querySnapshot2.docs.length > 0){
    return 'email';
  } else {
    return false;
  }
}

export const checkDuplicateAdmin = async (adminNo, email) => {
  const q1 = query(usersRef, where("adminNo", "==", adminNo));
  const q2 = query(usersRef, where("email", "==", email));
  const querySnapshot1 = await getDocs(q1);
  const querySnapshot2 = await getDocs(q2);
  if(querySnapshot1.docs.length > 0){
    return 'adminNo';
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

const addNewOrganization = async (orgID, orgName, orgAddress) =>{
  await addDoc(orgRef, {
    orgID: orgID,
    orgName: orgName,
    orgAddress: orgAddress
  });
}

const addOrganizationRep = async (username, name, email, mobileNo, jobtitle, password, orgID, orgDocID, uid) => {
  await setDoc(doc(db, "users", uid), {
    username: username,
    fullname: name,
    email: email,
    mobileNo: mobileNo,
    jobTitle: jobtitle,
    password: password,
    orgID: orgID,
    userType: "orgRep",
    orgDocID: orgDocID
  })
}

const addCovidManAdmin = async (adminNo, username, name, email, mobileNo, password, uid) => {
  await setDoc(doc(db, "users", uid), {
    adminNo: adminNo,
    username: username,
    fullname: name,
    email: email,
    mobileNo: mobileNo,
    password: password,
    userType: "covidManAdmin",
  })
}

export const getUserByUsername = async (username) => {
  const q1 = query(usersRef, where("username", "==", username));
  const querySnapshot1 = await getDocs(q1);
  if(querySnapshot1.docs.length > 0){
    return querySnapshot1.docs[0].data()
  }else{
    console.log("No such document!");
  }
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


//Add new organization
export const createNewOrganization = (name, address) => {
  const getOrganizationCount = async () => {
    const snapshot = await getDocs(orgRef)
    var orgID = ''

    if(snapshot.docs.length > 99){
      orgID = 'org' + (snapshot.docs.length + 1)
    }else if(snapshot.docs.length > 9){
      orgID = 'org0' + (snapshot.docs.length + 1)
    }else{
      orgID = 'org00' + (snapshot.docs.length + 1)
    }
    addNewOrganization(orgID, name, address);
  }
  getOrganizationCount()
}

export const createOrganizationRep = (username, name, email, mobileNo, jobtitle, orgID, orgDocID) => {
  const indexOfAt = email.indexOf("@");
  const password = email.substring(0, indexOfAt);
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      addOrganizationRep(username, name, email, mobileNo, jobtitle, password, orgID, orgDocID, uid)
      sendEmail(name, username, password, email)
        .then((res) => {
          console.log('Please check your mail box for your username and password');
        })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error.code + " " + errorMessage);
    });
}

export const createCovidManAdmin = (adminNo, name, email, mobileNo) =>{
  const indexOfAt = email.indexOf("@");
  const password = email.substring(0, indexOfAt);
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      console.log('add admin');
      addCovidManAdmin(adminNo, password, name, email, mobileNo, password, uid)
      sendEmail(name, password, password, email)
        .then((res) => {
          console.log('Please check your mail box for your username and password');
        })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error.code + " " + errorMessage);
    });
}