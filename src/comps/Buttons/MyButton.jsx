import React from "react";

function MyButton({ text }) {
  const btnStyle = {
    backgroundColor: "blue",
    color: "white",
  };
  return <button style={btnStyle}>{text}</button>;
}

export default MyButton;
