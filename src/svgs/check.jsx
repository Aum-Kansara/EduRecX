import React from "react";
import "./check.css";

const Check = () => {
  return (
    <div className="containe flex justify-center w-[80%] ">
      <input type="Checkbox" id="cbx" style={{ display: "none" }} />
      <label for="cbx" className="check flex items-center gap-3 justify-center">
        <svg width="18px" height="18px" viewBox="0 0 18 18">
          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
          <polyline points="1 9 7 14 15 4"></polyline>
        </svg>
        <span>I agree the </span>{" "}
      </label>
      <span>
        <a className="font-bold  text-blue-500"> Terms and Conditions</a>
      </span>
    </div>
  );
};

export default Check;
