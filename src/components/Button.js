import React from "react";

const Button = ({ title, disabled, onClick }) => {
  return (
    <button onClick={onClick} className="button" disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
