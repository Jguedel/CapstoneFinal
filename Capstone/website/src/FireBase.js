import firebase from 'firebase';
import 'firebase/firestore'
import {initFirestorter} from 'firestorter'

const config = firebase.initializeApp({
  apiKey: "AIzaSyBHGAzdTT4lX68_ZlnvVSYzge5GVxDCz6E",
  authDomain: "capstone-bf470.firebaseapp.com",
  databaseURL: "https://capstone-bf470-default-rtdb.firebaseio.com",
  projectId: "capstone-bf470",
  storageBucket: "capstone-bf470.appspot.com",
  messagingSenderId: "943556156648",
  appId: "1:943556156648:web:cf1a348dd9632c5a847d5d",
  measurementId: "G-C78LDSS2GG"
});
initFirestorter({ firebase: firebase });

export default firebase;