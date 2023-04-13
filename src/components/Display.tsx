import React from "react";
import { DisplayProps } from "../types";

function Display({
  calcInput,
  handleChangeCalcInput,
  handleKeyDown,
  printOut,
}: DisplayProps) {
  return (
    <div>
      <h2>Display</h2>
      <p>Print out: {printOut}</p>
      <input
        autoFocus
        value={calcInput}
        onKeyDown={handleKeyDown}
        onChange={handleChangeCalcInput}
      />
    </div>
  );
}

export default Display;
