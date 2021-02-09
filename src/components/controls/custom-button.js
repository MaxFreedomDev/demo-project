import React from "react";
import "./index.scss";

const CustomButton = ({ width, label, onClick, disabled, type }) => {
  return (
    <button
      style={{ width }}
      className="customBtn"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
};

export default CustomButton;
