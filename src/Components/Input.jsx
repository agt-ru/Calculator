import React from "react";
import "../Styles/Input.css";

export default function Input(props) {
  const { operand, result, mathExpr, showResult } = props;
  return (
    <div className="input">
      <div className="whole">{mathExpr}</div>
      <div className="current">{showResult ? result : operand}</div>
    </div>
  );
}
