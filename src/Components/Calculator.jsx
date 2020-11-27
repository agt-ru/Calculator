import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import "../Styles/Calculator.css";

const MAX_DIGITS = 11;
const MAX_DIGITS_WHOLE = 27;
const buttons = [
  "AC",
  "+/-",
  "%",
  "/",
  "7",
  "8",
  "9",
  "\u204E",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];

let currOperator = '';
let result = 0;
let calculated = false;
let fraction = false;

export default function Calculator(props) {
  let [operand, setOperand] = useState('0');
  let [mathExpr, setMathExpr] = useState('');
  let [showResult, setShowResult] = useState(true);

  function shortenNum(num) {
    let numStr = num.toString();
    let [int, fraction] = numStr.split(".");
    let resultStr = "",
      result;
    if (int.length >= MAX_DIGITS - 1 || numStr.search("e") !== -1) {
      result = parseFloat(num).toExponential(5);
    } else if (int.length < MAX_DIGITS - 1 && fraction) {
      resultStr += int + "." + fraction.slice(0, MAX_DIGITS - int.length - 2);
      result = parseFloat(resultStr);
    } else {
      result = num;
    }
    return result;
  }

  function handleButtonClick(e, value) {
    if (value === "AC") {
      operand = '0';
      result = 0;
      mathExpr = "";
      currOperator = "";
      showResult = true;
      fraction = false;
      calculated = false;
    }

    if (value === "+/-") operand = `${-parseFloat(operand)}`;
    else if (/[-/+\u204E%]/.test(value)) {
      if (value === "\u204E") value = "*";
      if (value === '%') { 
        operand = result * parseFloat(operand) / 100;
        value = currOperator;
      }
      if (calculated) {
        calculated = false;
        mathExpr = `${result} ${value}`;
      } else if (!showResult || mathExpr === "") {
        if (mathExpr) mathExpr += " ";
        mathExpr += `${operand} ${value}`;
        result = shortenNum(
          currOperator
            ? eval(result + currOperator + operand)
            : operand
        );
        showResult = true;
      }
      mathExpr = mathExpr.slice(0, mathExpr.length - 1) + value;
      currOperator = value;
      fraction = false;
    }

    if (value === "=") {
      fraction = false;
      calculated = true;
      mathExpr = "";
      result = shortenNum(
        currOperator
          ? eval(result + currOperator + operand)
          : operand
      );
      showResult = true;
    }

    if(value === '.' && !showResult) {
      fraction = true;
      operand += '.';
    }

    if (/[0-9]/.test(value)) {
      if (showResult) {
        operand = '0';
        showResult = false;
      }
      if(fraction && operand.indexOf('.') === -1) {
        operand += '.';
      }
      operand = operand === '0' ? value : operand + value;
      operand = operand.slice(0, MAX_DIGITS);
    }

    // slice if need be to fit digits in the upper input field
    const minSliceId = Math.max(mathExpr.length - MAX_DIGITS_WHOLE, 0);
    const sliceFirst = minSliceId > 0;
    const sliceSecond = !/ [0-9]/.test(
      mathExpr[minSliceId - 1] + mathExpr[minSliceId]
    );
    if (sliceFirst) mathExpr = mathExpr.slice(minSliceId);
    if (sliceFirst && sliceSecond) {
      const finSliceId = Math.max(mathExpr.search(/ [0-9]/), 0);
      mathExpr = mathExpr.slice(finSliceId);
    }

    setOperand(operand);
    setMathExpr(mathExpr);
    setShowResult(showResult);
  }

    return (
      <div className="calculator">
        <Input
          operand={operand}
          result={result}
          mathExpr={mathExpr}
          showResult={showResult}
        />
        <div className="buttons">
          {buttons.map((value) => (
            <Button value={value} handleClick={handleButtonClick} />
          ))}
        </div>
      </div>
    );
}
