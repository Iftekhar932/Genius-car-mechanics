import React from "react";
import img1 from "../../assets/images/banner/1.jpg";
import img2 from "../../assets/images/banner/2.jpg";
import img3 from "../../assets/images/banner/3.jpg";
import img4 from "../../assets/images/banner/4.jpg";
import img5 from "../../assets/images/banner/5.jpg";
import img6 from "../../assets/images/banner/6.jpg";

const Banner = () => {
  const imgs = [
    { source: img1, id: "slide1", href1: "#slide6", href2: "#slide2" },
    { source: img2, id: "slide2", href1: "#slide1", href2: "#slide3" },
    { source: img3, id: "slide3", href1: "#slide2", href2: "#slide4" },
    { source: img4, id: "slide4", href1: "#slide3", href2: "#slide5" },
    { source: img5, id: "slide5", href1: "#slide4", href2: "#slide6" },
    { source: img6, id: "slide6", href1: "#slide5", href2: "#slide1" },
  ];

  return (
    <div className="carousel w-full rounded-xl">
      {imgs.map((image, index) => {
        return (
          <div
            id={image.id}
            className="carousel-item relative w-full bg-gradient-to-tl from-slate-400 to-slate-900"
            key={index}
          >
            <img
              src={image.source}
              className="w-full mix-blend-overlay rounded-xl"
            />

            <div className="absolute flex justify-end transform -translate-y-1/2 left-5 top-1/3">
              <h1 className="text-6xl font-bold text-white">
                Affordable price <br /> for <br /> servicing
              </h1>
            </div>

            <div className="absolute flex justify-end transform -translate-y-1/2 left-5 top-2/4 w-1/3">
              <p className="text-xl font-bold text-white">
                There are many variations of passages of available, but the
                majority have suffered alteration in some form
              </p>
            </div>

            <div className="absolute flex justify-end transform -translate-y-1/2 left-5 top-2/3">
              <button className="btn btn-secondary mr-5 rounded">
                Discover More
              </button>
              <button className="btn btn-outline btn-secondary rounded font-bold">
                Latest Projects
              </button>
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
              <a href={image.href1} className="btn btn-circle mr-5 mb-16">
                ❮
              </a>
              <a href={image.href2} className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Banner;
