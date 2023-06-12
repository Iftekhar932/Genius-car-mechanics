import React, { useContext, useState } from "react";

import { firebaseContext } from "../../contexts/FirebaseContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const SignUp = () => {
  const { emailSignUpHandler, user, setUser, googleSignInHandler } =
    useContext(firebaseContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname;

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = `${e.target.firstName.value} ${e.target.lastName.value}`;
    console.log(username, email, password);
    e.target.reset();
    emailSignUpHandler(email, password)
      .then((userCredential) => {
        const createdUser = userCredential.user;
        createdUser.displayName = username;

        console.log(createdUser, "line 31 singUp.jsx");
        setUser(createdUser);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(
          "🚀 ~ file: SignUp.jsx:39 ~ submitHandler ~ code, Message",
          errorCode,
          errorMessage
        );
      });
  };

  const googleSignInClickHandler = () => {
    googleSignInHandler()
      .then((data) => {
        console.log(data);
        setUser(data);
        navigate(from, { replace: true });
      })
      .catch((err) => console.log("signup.jsx line 52", err.code, err.message));
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign up now!</h1>
          <p className="py-6 hover:underline">
            <Link to="/login">Login here</Link>
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={submitHandler} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="name"
                placeholder="First name"
                name="firstName"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="name"
                placeholder="Last name"
                name="lastName"
                className="input input-bordered"
              />
            </div>

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
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            {!user?.email && (
              <button
                onClick={googleSignInClickHandler}
                className="btn btn-primary hover:text-white gap-1"
              >
                <FaGoogle size="1rem" onClick={googleSignInClickHandler} />
                Sign up with google
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
