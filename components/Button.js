import React from "react";
const Button = ({
  text,
  handleClick,
  type,
  btnStyle,
  disabled,
  showTick,
  showText,
}) => {
  if (type === "submit") {
    return (
      <button
        type={type}
        onClick={handleClick}
        disabled={disabled}
        className={`
           hover:bg-gradient-to-r from-btnHover1 to-btnHover2 p-3 text-white rounded  ${btnStyle}`}>
        {text}
      </button>
    );
  } 
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`${btnStyle}`}
      
      style={{fontFamily: "Montserrat"}}  >
      {text}
    </button>
  );
};

export default Button;
