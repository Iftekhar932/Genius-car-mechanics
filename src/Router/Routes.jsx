import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Main from "../Pages/Layout/Main/Main";
import Home from "../Pages/Home/Home";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Checkout from "../Pages/Checkout/Checkout";
import Orders from "../Pages/Orders/Orders";
import UpdateOrder from "../Pages/UpdateOrder/UpdateOrder";
const { createBrowserRouter } = require("react-router-dom");

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },

  {
    path: "/orders",
    element: (
      <PrivateRoute>
        <Orders />
      </PrivateRoute>
    ),
    loader: async ({ request }) => {
      const userEmailFromReq = request.url;
      const userEmail = userEmailFromReq.slice(
        userEmailFromReq.indexOf("=") + 1,
        userEmailFromReq.length
      );
      const tkn = localStorage.getItem("jsonWebToken");

      return await fetch(`http://localhost:5000/orders?email=${userEmail}`, {
        headers: { authorization: `Bearer ${tkn}` },
      })
        .then((res) => {
          if (res.status === (401 || 403)) {
            localStorage.setItem("userLoggedInStatus", true);

            return window.location.replace("/"); // can't use 'useNavigate()' hook as it is not in a component
          }
          return res.json();
        })
        .then((data) => {
          if (data.signUserOut) {
            localStorage.setItem("userLoggedInStatus", data.signUserOut);
          }
          return data;
        })
        .catch((err) => console.log(err));
    },
  },

  {
    path: "/updateOrder/:id",
    element: (
      <PrivateRoute>
        <UpdateOrder />
      </PrivateRoute>
    ),
    loader: ({ params }) => {
      return fetch(`http://localhost:5000/orders/${params.id}`);
    },
  },

  {
    path: "/checkout/:id",
    element: (
      <PrivateRoute>
        <Checkout />
      </PrivateRoute>
    ),
    loader: ({ params }) => {
      return fetch(`http://localhost:5000/services/${params.id}`);
    },
  },
]);

export default routes;
