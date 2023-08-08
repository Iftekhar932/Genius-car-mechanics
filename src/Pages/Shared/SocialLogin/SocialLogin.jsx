import React, { useContext } from "react";
import { firebaseContext } from "../../../contexts/FirebaseContext";
import { setAuthToken } from "../../../apis/auth";
import { Navigate, useLocation } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
  const { googleSignInHandler, setUser, user } = useContext(firebaseContext);
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  //  this one uses 'signInWithPopUp()'
  const googleSignInClickHandler = () => {
    googleSignInHandler()
      .then((result) => {
        if (localStorage.getItem("userLoggedInStatus")) {
          localStorage.removeItem("userLoggedInStatus");
        }

        const currentUser = result.user;

        // get jwt token
        setAuthToken(currentUser);

        setUser(currentUser);
        Navigate(from, { replace: true });
      })
      .catch((err) => console.log("login.jsx line 91", err.code, err.message));
  };

  return (
    <div>
      <p className="text-center">
        <small>Social Login</small>
      </p>
      <p className="text-center">
        {user?.email == null && (
          <button
            onClick={googleSignInClickHandler}
            className="btn btn-ghost hover:text-white gap-1"
          >
            <FaGoogle size="1rem" onClick={googleSignInClickHandler} />
            Sign In with google
          </button>
        )}{" "}
      </p>
    </div>
  );
};

export default SocialLogin;
