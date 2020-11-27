import React from "react";
import "../Styles/Button.css";

export default function Button(props) {
  const { value, handleClick } = props;
  const spansTwo = value === "0" ? "spans-two" : "";
  return (
    <button
      className={`button ${spansTwo}`}
      onClick={(e) => handleClick(e, value)}
    >
      {value}
    </button>
  );
}
