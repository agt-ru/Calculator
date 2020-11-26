import React, { Component } from 'react'
import '../Styles/Button.css';

export default class Button extends Component {
  render() {
    const spansTwo = this.props.value === '0' ? 'spans-two': '';
    return (
      <button className={`button ${spansTwo}`} onClick={e => this.props.handleClick(e, this.props.value)}>
        {this.props.value}
      </button>
    )
  }
}
