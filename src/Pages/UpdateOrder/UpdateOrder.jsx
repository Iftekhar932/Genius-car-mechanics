import React, { useContext } from "react";
import { firebaseContext } from "../../contexts/FirebaseContext";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateOrder = () => {
  const { user } = useContext(firebaseContext);

  const navigate = useNavigate();
  const userOrderData = useLoaderData();
  const { _id } = userOrderData;

  const updateSubmitHandler = (e) => {
    e.preventDefault();
    const updatedMessage = e.target.message.value;
    fetch(`http://localhost:5000/orders/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updatedMessage }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.acknowledged);
        navigate("/orders");
      })
      .catch((err) => console.log("front line 24 updateOrder.jsx", err));
  };

  return (
    <>
      <form
        onSubmit={(e) => updateSubmitHandler(e)}
        className="grid grid-cols-1 md:grid-cols-2 my-10 p-10 gap-4 w-1/2 mx-auto border place-items-center border-red-50"
      >
        <textarea
          className="textarea textarea-primary"
          placeholder="Message"
          name="message"
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UpdateOrder;
