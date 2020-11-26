import React, { Component } from "react";
import Button from "./Button";
import Input from "./Input";
import "../Styles/Calculator.css";

const MAX_DIGITS = 12;
const MAX_DIGITS_WHOLE = 27;

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      operand: '0',
      mathExpr: "",
      showResult: true,
    };
    this.currOperator = "";
    this.result = 0;
    this.calculated = false;
    this.fraction = false
  }

  shortenNum(num) {
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

  handleButtonClick(e, value) {
    let { operand, mathExpr, showResult } = this.state;

    if (value === "AC") {
      operand = '0';
      this.result = 0;
      mathExpr = "";
      this.currOperator = "";
      showResult = true;
      this.fraction = false;
      this.calculated = false;
    }

    if (value === "+/-") operand = `${-parseFloat(operand)}`;
    else if (/[-/+\u204E%]/.test(value)) {
      if (value === "\u204E") value = "*";
      if (value === '%') { 
        operand = this.result * parseFloat(operand) / 100;
        value = this.currOperator;
      }
      if (this.calculated) {
        this.calculated = false;
        mathExpr = `${this.result} ${value}`;
      } else if (!showResult || mathExpr === "") {
        if (mathExpr) mathExpr += " ";
        mathExpr += `${operand} ${value}`;
        this.result = this.shortenNum(
          this.currOperator
            ? eval(this.result + this.currOperator + operand)
            : operand
        );
        showResult = true;
      }
      mathExpr = mathExpr.slice(0, mathExpr.length - 1) + value;
      this.currOperator = value;
      this.fraction = false;
    }

    if (value === "=") {
      this.fraction = false;
      this.calculated = true;
      mathExpr = "";
      this.result = this.shortenNum(
        this.currOperator
          ? eval(this.result + this.currOperator + operand)
          : operand
      );
      showResult = true;
    }

    if(value === '.' && !showResult) {
      this.fraction = true;
      operand += '.';
    }

    if (/[0-9]/.test(value)) {
      if (showResult) {
        operand = '0';
        showResult = false;
      }
      if(this.fraction && operand.indexOf('.') === -1) {
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

    this.setState({
      operand: operand,
      mathExpr: mathExpr,
      showResult: showResult,
    });
  }

  render() {
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
    return (
      <div className="calculator">
        <Input
          operand={this.state.operand}
          result={this.result}
          mathExpr={this.state.mathExpr}
          showResult={this.state.showResult}
        />
        <div className="buttons">
          {buttons.map((value) => (
            <Button value={value} handleClick={this.handleButtonClick} />
          ))}
        </div>
      </div>
    );
  }
}
