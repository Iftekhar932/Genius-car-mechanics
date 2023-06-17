import React, { useContext, useEffect, useState } from "react";
// import { FcGoogle } from "react-icons/fc";
import { FaGoogle } from "react-icons/fa";
// FaGoogle is the alternative
import { firebaseContext } from "../../contexts/FirebaseContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const {
    emailLoginHandler,
    googleSignInHandler,
    user,
    setUser,
    googleSignInHandler2,
  } = useContext(firebaseContext);

  // if user is logged in navigate to home page
  if (user?.email) {
    return navigate("/");
  }

  // user login function
  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    emailLoginHandler(email, password)
      .then((userCredential) => {
        if (localStorage.getItem("userLoggedInStatus")) {
          localStorage.removeItem("userLoggedInStatus");
        }

        const createdUser = userCredential.user;

        //  get jsonWebToken
        fetch("http://localhost:5000/jwt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: createdUser.email }),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("jsonWebToken", data.token);
          })
          .catch((error) =>
            console.log("login.jsx jwt api line 51", error.code, error.message)
          );

        setUser(createdUser);
        e.target.reset();
        // navigate("/");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(
          "🚀 ~ file: Login.jsx:40 ~ submitHandler ~ code, Message",
          errorCode,
          errorMessage
        );
      });
  };

  //  this one uses 'signInWithPopUp()'
  const googleSignInClickHandler = () => {
    googleSignInHandler()
      .then((result) => {
        if (localStorage.getItem("userLoggedInStatus")) {
          localStorage.removeItem("userLoggedInStatus");
        }
        setUser(result);
        navigate(from, { replace: true });
      })
      .catch((err) => console.log("login.jsx line 79", err.code, err.message));
  };

  //  this one uses 'signInWithRedirect()' this function isn't used anywhere yet
  const googleSignInClickHandler2 = () => {
    googleSignInHandler2()
      .then((result) => {
        if (localStorage.getItem("userLoggedInStatus")) {
          localStorage.removeItem("userLoggedInStatus");
        }
        setUser(result);
        navigate(from, { replace: true });
      })
      .catch((err) => console.log("login.jsx line 62", err.code, err.message));
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6 hover:underline">
            <Link to="/signup">Signup here</Link>
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={submitHandler} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary hover:text-white"
              >
                Log In
              </button>
            </div>
          </form>
          <div className="form-control">
            {user?.email == null && (
              <button
                onClick={googleSignInClickHandler}
                className="btn btn-primary hover:text-white gap-1"
              >
                <FaGoogle size="1rem" onClick={googleSignInClickHandler} />
                Sign In with google
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
