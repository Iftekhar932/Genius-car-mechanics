import React from "react";
import StarRating from "../StarRating/StarRating";

const Product = ({ product }) => {
  const { title, img, price } = product;
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl p-4">
      <figure>
        <img src={img} alt={title} className="h-52" />
      </figure>
      <div className="card-body">
        <StarRating />
        <h2 className="card-title capitalize self-center">{title}</h2>
        <div className="card-actions justify-evenly items-center font-extrabold">
          <p className=" text-orange-500">Price : ${price}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
