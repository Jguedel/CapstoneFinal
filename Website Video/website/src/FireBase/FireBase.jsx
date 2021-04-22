import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHGAzdTT4lX68_ZlnvVSYzge5GVxDCz6E",
  authDomain: "capstone-bf470.firebaseapp.com",
  databaseURL: "https://capstone-bf470-default-rtdb.firebaseio.com",
  projectId: "capstone-bf470",
  storageBucket: "capstone-bf470.appspot.com",
  messagingSenderId: "943556156648",
  appId: "1:943556156648:web:cf1a348dd9632c5a847d5d",
  measurementId: "G-C78LDSS2GG",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
//firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const handleUserProfile = async (userAuth, additonalData) => {
  if (!userAuth) return;
  const { uid } = userAuth;
  const userRef = firestore.doc("Users/" + uid);
  const snapshot = await userRef.get();

  //IF USER DOESNT EXISIT CREATE USER
  if (!snapshot.exists) {
    const { email } = userAuth;
    const timeStamp = new Date();
    const Role = "user";
    const cart = [];
    const orders = [];
    try {
      await userRef.set({
        email,
        createdData: timeStamp,
        Role,
        cart,
        orders,
        ...additonalData,
      });
    } catch (error) {
      alert(error);
    }
  }
  return userRef;
};
