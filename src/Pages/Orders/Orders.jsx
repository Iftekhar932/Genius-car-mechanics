import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import SingleOrder from "../SingleOrder/SingleOrder";
import { firebaseContext } from "../../contexts/FirebaseContext";

const Orders = () => {
  const { user } = useContext(firebaseContext);
  let orderedData = useLoaderData();
  if (Boolean(orderedData[0]) == false) {
    return (orderedData = []);
  }

  return (
    <div className="overflow-x-auto my-10">
      <table className="table mx-auto">
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
          {orderedData?.map((orders) => {
            return <SingleOrder orders={orders} key={orders._id} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
