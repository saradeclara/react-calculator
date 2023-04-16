import { DisplayProps } from "../types";

function Display({
  calcInput,
  handleChangeCalcInput,
  handleKeyDown,
  printOut,
}: DisplayProps) {
  return (
    <div>
      <p id="printout-window">{printOut}</p>
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
