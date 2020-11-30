import React, { useState } from "react";
import "../Styles/Button.css";

export default function Button(props) {
  const [highlightStyle, setHighlightStyle] = useState({
    top: 0,
    left: 0,
    opacity: 0,
  });

  function moveHighlight(e) {
    setHighlightStyle({
      left: e.nativeEvent.layerX - 100,
      top: e.nativeEvent.layerY - 100
    });
  }

  function hideHighlight(e) {
    setHighlightStyle({
      opacity: 0
    });
  }

  const { value, handleClick } = props;
  const spansTwo = value === "0" ? "spans-two" : "";
  return (
    <div
      className={`button ${spansTwo}`}
      onClick={(e) => handleClick(e, value)}
      onMouseMove={moveHighlight}
      onMouseOut={hideHighlight}
    >
      <div class="value">{value}</div>
      <div className="highlight" style={highlightStyle}></div>
    </div>
  );
}
