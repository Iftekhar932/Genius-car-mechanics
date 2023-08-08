import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import Themes from "../../../Themes/Themes";
import { firebaseContext } from "../../../contexts/FirebaseContext";
const themes = Themes.daisyui.themes;

const NavBar = () => {
  const { user, setUser, signOutHandler } = useContext(firebaseContext);

  const selectedTheme = localStorage.getItem("selectedTheme");
  const [theme, setTheme] = useState(selectedTheme);

  // on every render it sets 'data-theme' to the html tag
  useEffect(() => {
    return document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  // set state value for selected theme
  const themeSetter = (e) => {
    localStorage.setItem("selectedTheme", e.target.innerText.toLowerCase());
    setTheme(e.target.innerText.toLowerCase());
  };

  if (localStorage.getItem("userLoggedInStatus")) {
    localStorage.removeItem("userLoggedInStatus");
    signOutHandler();
    return alert("signed out");
  }

  const signOutClickHandler = () => {
    signOutHandler()
      .then(() => {
        setUser(null);
        // setLoading(false);
      })
      .catch((err) => console.log(err, "NavBar.jsx line 29 error"));
  };

  const menu = (
    <div className="flex">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        {(user?.email || user?.uid) && (
          <Link to={`/orders?email=${user?.email}`}>Orders</Link>
          // <Link to={`/orders/${user?.email}`}>Orders</Link>
          // <Link to={`/orders`}>Orders</Link>
        )}
      </li>
    </div>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {/* can use list tag which causes dom element errors */}
            <span>{menu}</span>
          </ul>
        </div>
        <Link className="btn btn-ghost normal-case text-xl" to="/">
          <img src={logo} alt="logo" className="h-[inherit]" />
        </Link>
        <Link className="btn btn-ghost normal-case text-xl" to="/">
          <span>{user?.displayName}</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {/* can use list tag which causes dom element errors */}
          <span>{menu}</span>
        </ul>
      </div>
      <div className="navbar-end">
        {user?.email ? (
          <>
            {/*   <a className="btn" onClick={signOut}>
              Sign Out
            </a> */}
            <a className="btn" onClick={signOutClickHandler}>
              Sign Out
            </a>
          </>
        ) : (
          <>
            <Link to="/login" className="btn">
              Sign In
            </Link>
          </>
        )}
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src="https://static.thenounproject.com/png/3658224-200.png"
                  className="hover:invert"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {themes.map((theme, index) => {
                return (
                  <li
                    key={index}
                    onClick={themeSetter}
                    className="cursor-pointer capitalize hover:bg-slate-500"
                  >
                    {theme}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
