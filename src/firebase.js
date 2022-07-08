import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import  toast  from "react-hot-toast";

const firebaseConfig = {
  apiKey: "AIzaSyDT1CdwmA_Zed1KoVF6HcbSjXK-o1jEjy4",
  authDomain: "ramazan-auth.firebaseapp.com",
  projectId: "ramazan-auth",
  storageBucket: "ramazan-auth.appspot.com",
  messagingSenderId: "243896881446",
  appId: "1:243896881446:web:70b88e622e5617beedf1e7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const register = async ( email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export default app;
