import React from "react";
import { useLocation } from "react-router-dom";

function BackBox() {
  const location = useLocation();
  const isDim = location.pathname === "/diary";

  return (
    <>
      <div className="main-container">
        <div className={`box-container ${isDim ? "box-dim" : ""}`}></div>
      </div>
    </>
  );
}

export default BackBox;
