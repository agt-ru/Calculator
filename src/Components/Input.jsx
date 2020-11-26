import React, { Component } from 'react'
import '../Styles/Input.css';

export default class Input extends Component {
  render() {
    return (
      <div className="input">
        <div className="whole">{this.props.mathExpr}</div>
        <div className="current">{this.props.showResult ? this.props.result : this.props.operand}</div>        
      </div>
    )
  }
}
