import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const { id, service_id, title, img, price, description, facility, _id } =
    service;
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl p-4">
      <figure>
        <img src={img} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions justify-evenly items-center font-extrabold">
          <p className=" text-orange-500">Price : ${price}</p>
          <span className="text-2xl font-bold text-orange-500">
            <Link to={`/checkout/${_id}`}>&rarr;</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
