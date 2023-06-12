import React, { useEffect, useState } from "react";
import ServiceCard from "../ServiceCard/ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div className="h-fit my-4">
      <div className="flex flex-col justify-around mx-auto text-center w-1/2 h-32">
        <span className="text-orange-500 font-bold text-sm">Service</span>
        <h1 className="font-bold capitalize text-xl">Our service area</h1>
        <span className="font-light">
          the majority have suffered alteration in some form, by injected
          humour, or randomized words which don't look even slightly believable.{" "}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {services?.map((service) => {
          return <ServiceCard service={service} key={service._id} />;
        })}
      </div>
      <button className="btn btn-outline btn-error rounded-lg text-orange-500 hover:bg-orange-500 mx-auto block my-8">
        More Services
      </button>
    </div>
  );
};

export default Services;
