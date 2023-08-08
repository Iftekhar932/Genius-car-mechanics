import React from "react";
import { Link } from "react-router-dom";

const SingleOrder = ({ orders }) => {
  const {
    customer,
    email,
    message,
    phone,
    price,
    service,
    serviceName,
    _id,
    img,
    status,
  } = orders;

  const orderConfirmationClickHandler = (e) => {
    orders.status = "approved";
    e.target.innerText = orders?.status;
    console.log(orders);
  };

  const deletionClickHandler = (e, orderID) => {
    e.target.parentNode.parentNode.classList.add("hidden");
    fetch(`http://localhost:5000/orders/${orderID}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log("front 24 singleOrder.jsx", err));
  };

  return (
    <>
      <tr>
        <td>
          <div className="flex items-center space-x-3 ">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={img} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{customer}</div>
              <div className="text-sm opacity-50">{phone}</div>
            </div>
          </div>
        </td>
        <td>
          {serviceName}
          <br />
          <span className="badge badge-ghost badge-sm">$ {price}</span>
        </td>
        <td>{email}</td>
        <th>{message}</th>

        <th>
          <Link to={`/updateOrder/${_id}`}>
            <button className="btn btn-ghost btn-xs">Rewrite Message</button>
          </Link>
        </th>
        <th>
          <button
            className="btn btn-ghost btn-xs"
            onClick={(e) => {
              deletionClickHandler(e, _id);
            }}
          >
            Delete
          </button>
        </th>
        <th>
          <button
            className="btn btn-ghost btn-xs"
            onClick={(e) => {
              orderConfirmationClickHandler(e, _id);
            }}
          >
            {orders?.status ? orders?.status : "Pending"}
          </button>
        </th>
      </tr>
    </>
  );
};

export default SingleOrder;
