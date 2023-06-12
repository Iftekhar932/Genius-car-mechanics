import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = () => {
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(null);

  return (
    <div>
      <div className="rating">
        <input
          type="radio"
          name="rating-4"
          className="mask mask-star-2 bg-amber-500"
        />
        <input
          type="radio"
          name="rating-4"
          className="mask mask-star-2 bg-amber-500"
          defaultChecked
        />
        <input
          type="radio"
          name="rating-4"
          className="mask mask-star-2 bg-amber-500"
        />
        <input
          type="radio"
          name="rating-4"
          className="mask mask-star-2 bg-amber-500"
        />
        <input
          type="radio"
          name="rating-4"
          className="mask mask-star-2 bg-amber-500"
          defaultChecked
        />
      </div>
    </div>
  );
};

export default StarRating;
