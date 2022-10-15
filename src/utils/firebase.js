import firebase from "firebase/compat/app"; // version 9
import "firebase/compat/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD6qcCjbcPeD6pwowpNCm2wa6rCIHcR1oc",
  authDomain: "vigo-fdf71.firebaseapp.com",
  projectId: "vigo-fdf71",
  storageBucket: "vigo-fdf71.appspot.com",
  messagingSenderId: "1062408749481",
  appId: "1:1062408749481:web:887627431e008ec9d9c4b8",
  measurementId: "G-2W7PL95FTJ",
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();
const storage = getStorage(firebase.initializeApp(firebaseConfig));
export { auth, provider, storage };
