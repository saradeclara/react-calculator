import React from "react";
import { DisplayProps } from "../types";

function Display({ calcInput, handleChangeCalcInput, printOut }: DisplayProps) {
  return (
    <div>
      <h2>Display</h2>
      <p>Print out: {printOut}</p>
      <input value={calcInput} onChange={handleChangeCalcInput} />
    </div>
  );
}

export default Display;
