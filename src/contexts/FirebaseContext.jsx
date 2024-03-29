import React, { createContext, useEffect, useState } from "react";
// Firebase imports and auth app authentication 🔥🔥
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";

import { app } from "../firebase/firebase.init";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// context
export const firebaseContext = createContext();

const FirebaseContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const emailSignUpHandler = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const emailLoginHandler = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutHandler = () => {
    setLoading(true);
    if (localStorage.getItem("userLoggedInStatus")) {
      localStorage.removeItem("userLoggedInStatus");
    }
    localStorage.removeItem("jsonWebToken");
    return signOut(auth);
  };

  const googleSignInHandler = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const googleSignInHandler2 = () => {
    setLoading(true);
    return signInWithRedirect(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = () => {
      return onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = currentUser.uid;
          setLoading(false);
          setUser(currentUser);
          // ...
        }
      });
    };
    return () => unsubscribe();
  }, []);

  const firebaseInfo = {
    signOutHandler,
    emailSignUpHandler,
    emailLoginHandler,
    user,
    loading,
    setLoading,
    setUser,
    signOut,
    googleSignInHandler,
    googleSignInHandler2,
  };

  return (
    <firebaseContext.Provider value={firebaseInfo}>
      {children}
    </firebaseContext.Provider>
  );
};

export default FirebaseContext;

/* 

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

  import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});

*/
