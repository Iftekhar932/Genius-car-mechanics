import React, { useContext } from "react";
import { firebaseContext } from "../contexts/FirebaseContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  /* const { user, loading, setLoading } = useContext(firebaseContext);

  if (loading) {
    return <h1>Loading 🍎🍎🍎</h1>;
  }

  if (user?.email) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace={true} />;
  } */

  const location = useLocation();
  const { user, loading, setLoading } = useContext(firebaseContext);

  // const from = location?.state?.from?.pathname || "/";
  // navigate(from, { replace: true });

  if (loading) {
    return <h1>Loading 🍎🍎🍎</h1>;
  }

  if (user?.email == null || user?.uid == null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
};

export default PrivateRoute;
