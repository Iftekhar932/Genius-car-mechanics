import React, { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { firebaseContext } from "../../contexts/FirebaseContext";

const Checkout = () => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [modalText, setModalText] = useState("");

  const navigate = useNavigate("/");

  const { user } = useContext(firebaseContext);

  const serviceData = useLoaderData();
  const { title, _id, price, img } = serviceData;

  const purchaseFormSubmitHandler = (e) => {
    e.preventDefault();
    const name = `${e.target.firstName.value} ${e.target.middleName.value} ${e.target.lastName.value}`;
    const email = e.target.email.value.trim();
    const phone = e.target.phone.value.trim();
    const message = e.target.message.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      phone,
      message,
      img: img,
      status: null,
    };

    if (phone.length == 11) {
      fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      })
        .then((res) => res.json())

        .then((data) => {
          if (data.insertedId) {
            e.target.reset();
            setModalDisplay(true);
            setModalText("Order Placed");

            setTimeout(() => {
              setModalDisplay(false);
              navigate("/");
            }, 2500);
          }
        })
        .catch((err) => console.log("front 54 checkout.jsx", err));
    } else {
      setModalDisplay(true);
      setModalText("Error placing order");

      setTimeout(() => {
        setModalDisplay(false);
      }, 5000);
    }
  };

  return (
    <div>
      <h1 className="text-center mt-5 font-extrabold">
        {title}
        <br />
        <span className="text-center mt-5"> ${price}</span>
      </h1>

      <form
        onSubmit={purchaseFormSubmitHandler}
        className="grid grid-cols-1 md:grid-cols-2 my-10 p-10 gap-4 w-1/2 mx-auto border place-items-center border-red-50"
      >
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          className="input input-primary input-md w-full max-w-xs"
          defaultValue={user?.displayName}
          required
        />
        <input
          type="text"
          placeholder="Middle Name"
          name="middleName"
          className="input input-primary input-md w-full max-w-xs"
          defaultValue={user?.displayName}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          className="input input-primary input-md w-full max-w-xs"
          defaultValue={user?.displayName}
          required
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="input input-primary input-md w-full max-w-xs"
          defaultValue={user?.email}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          className="input input-primary input-md w-full max-w-xs"
          required
        />
        <textarea
          className="textarea textarea-primary"
          placeholder="Message"
          name="message"
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      {/* ALERT COMPONENT FROM DAISY UI */}
      <div
        className={`alert alert-${
          modalText.toLowerCase().includes("error") ? "error" : "primary"
        } ${modalDisplay ? "block" : "hidden"}`}
        onClick={() => {
          setModalDisplay(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span className="mx-auto text-center">{modalText}</span>
      </div>
    </div>
  );
};

export default Checkout;
