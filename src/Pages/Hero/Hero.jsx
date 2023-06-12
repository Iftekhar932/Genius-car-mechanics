import React from "react";
import person from "../../assets/images/about_us/person.jpg";
import parts from "../../assets/images/about_us/parts.jpg";

const Hero = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="w-1/2">
          <span className="text-orange-500 font-bold">About Us</span>
          <h1 className="text-5xl font-bold">
            We are qualified & of experience in this field
          </h1>
          <p className="py-6">
            There are many variations of passages of Lorem Ipsum <br />{" "}
            available, but the majority have suffered alteration in some <br />{" "}
            form, by injected humour, or randomized words which don't <br />{" "}
            look even slightly believable.
          </p>
          <p className="py-6">
            the majority have suffered alteration in some form, by injected{" "}
            <br />
            humour, or randomized words which don't look even slightly <br />
            believable.
          </p>
          <button className="btn btn-primary">Get More Info</button>
        </div>

        <div className="relative transform -invert-y-1/2 left-0  w-1/2">
          <img
            src={person}
            className="max-w-sm rounded-lg shadow-2xl absolute transform translate-y-1/2 bottom-10 h-80"
          />
          <img
            src={parts}
            className="max-w-sm rounded-lg shadow-2xl absolute transform -translate-y-20 top-10 left-28 h-64 bg-white p-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
