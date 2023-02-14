import React from "react";

const Card = ({ title, description, image, onClick }) => {
    return (
      <div className="card" onClick={onClick}>
        <img src={image} alt={title} />
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    );
  };

export default Card;
