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
      <p>Print out: {printOut}</p>
      <input
        autoFocus
        // type="number"
        value={calcInput}
        onKeyDown={handleKeyDown}
        onChange={handleChangeCalcInput}
      />
    </div>
  );
}

export default Display;
