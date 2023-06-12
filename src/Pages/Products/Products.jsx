import React from "react";
import Product from "../Product/Product";

import img1 from "../../assets/images/products/1.png";
import img2 from "../../assets/images/products/2.png";
import img3 from "../../assets/images/products/3.png";
import img4 from "../../assets/images/products/4.png";
import img5 from "../../assets/images/products/5.png";
import img6 from "../../assets/images/products/6.png";
const products = [
  {
    img: img1,
    title: "car engine plug",
    price: "20.00",
    id: 0,
  },
  {
    img: img2,
    title: "car air filter",
    price: "20.00",
    id: 1,
  },
  {
    img: img3,
    title: "car hydraulic brakes",
    price: "20.00",
    id: 2,
  },
  {
    img: img4,
    title: "car suspension",
    price: "20.00",
    id: 3,
  },
  {
    img: img5,
    title: "car tires",
    price: "20.00",
    id: 4,
  },
  {
    img: img6,
    title: "car battery",
    price: "20.00",
    id: 5,
  },
];

const Products = () => {
  return (
    <div className="h-fit my-4">
      <div className="flex flex-col justify-around mx-auto text-center w-1/2 h-32 my-5">
        <span className="text-orange-500 font-bold text-sm">Products</span>
        <h1 className="font-bold capitalize text-xl">Browse Our products</h1>
        <span className="font-light">
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4  text-center">
        {products.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
      </div>
      <button className="btn btn-outline btn-error rounded-lg text-orange-500 hover:bg-orange-500 mx-auto block my-8">
        More Services
      </button>
    </div>
  );
};

export default Products;
