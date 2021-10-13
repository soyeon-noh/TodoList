import React from "react";

function CompButton({ children, onClick }) {
  const btnStyle = {
    backgroundColor: "#61dafb",
    color: "white",
    border: "1px solid #61dafb",
  };
  return (
    <button style={btnStyle} onClick={onClick}>
      {children}
    </button>
  );
}

export default CompButton;
