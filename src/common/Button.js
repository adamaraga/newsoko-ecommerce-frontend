import React from "react";

const Button = ({ title, onclick }) => {
  return (
    <button className="buttonMain" onClick={onclick}>
      {title}
    </button>
  );
};

export default Button;
