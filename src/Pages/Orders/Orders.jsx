import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import SingleOrder from "../SingleOrder/SingleOrder";
import { firebaseContext } from "../../contexts/FirebaseContext";
const Orders = () => {
  const { user } = useContext(firebaseContext);
  const orderedData = useLoaderData();
  const orderData = orderedData.filter((order) => order.email == user?.email); // filter only user's ordered services to display

  return (
    <div className="overflow-x-auto my-10">
      <table className="table mx-auto">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Email</th>
            <th>Message</th>
            <th>Rewrite</th>
            <th>Remove</th>
            <th>Pending Orders</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((orders) => {
            return <SingleOrder orders={orders} key={orders._id} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
