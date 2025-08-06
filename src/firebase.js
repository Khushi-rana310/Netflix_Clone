
import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword, 
    getAuth, 
    signOut,
    signInWithEmailAndPassword} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};



const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db =getFirestore(app);

const signup = async(name, email, password)=>{
    try{
       const res= await createUserWithEmailAndPassword(auth, email, password);
       const user=res.user;
       await addDoc(collection(db, "users"),{
        uid: user.uid,
        name: name,
        authProvider: "local",
        email: email
       });
    }catch(err){
        console.log(err);
        toast.error(err.code.split('/')[1].split('_').join(" "));
    }
} 

const login=async(email, password)=>{
    try{
       await signInWithEmailAndPassword(auth, email, password);
    }catch(err){
        console.log(err);
        toast.error(err.code.split('/')[1].split('_').join(" "));
    }
}

const logout = async () => {
  try {
    await signOut(auth);
    console.log("Successfully signed out");
  } catch (error) {
    console.error("Error during logout:", error);
  }
}
export {auth, db, login, signup, logout};