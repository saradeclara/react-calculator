import { useState, useEffect } from "react";
import {
  BasicOperationKeys,
  Display,
  FunctionKeys,
  HistoryLog,
  NumberKeys,
} from "./components";
import { numberKeysData } from "./data";
import { keyType } from "./types";
import { calculate } from "./helpers";

const defaultPrintOut: string = "";
const defaultCalcInput: string = "";
const defaultMainSequence: keyType[] = [];

function App() {
  const [printOut, updatePrintOut] = useState(defaultPrintOut);
  const [calcInput, updateCalcInput] = useState(defaultCalcInput);
  const [mainSequence, updateMainSequence] = useState(defaultMainSequence);

  const operations = ["+", "-", "/", "*"];
  const lastElementInSequence = mainSequence[mainSequence.length - 1];
  const lastCharPrintOut = printOut[printOut.length - 1];
  const operationsInSequence = [...mainSequence].filter(
    ({ type }) => type === "operation"
  );

  const handleChangeCalcInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const lastCharValue = value.split("").pop();

    if (Number(value)) {
      // reset calcInput when inputting second number
      if (lastElementInSequence?.type === "operation" && lastCharValue) {
        updateCalcInput(lastCharValue);
      } else {
        // inputting first number
        updateCalcInput(value);
      }
    } else {
      if (
        lastCharValue &&
        operations.includes(lastCharValue) &&
        !operations.includes(lastElementInSequence?.value)
      ) {
        updatePrintOut(calcInput + " " + lastCharValue);
        if (operationsInSequence.length < 1) {
          const newOperationSequence = {
            type: "operation",
            value: lastCharValue,
          };
          updateMainSequence([...mainSequence, newOperationSequence]);
        }
      }
    }
  };

  // trigger 'calculate' function when pressing '=' button
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "=") {
      const result = calculate(mainSequence);
      const fullPrintOut = mainSequence.map(({ value }) => value).join(" ");
      updatePrintOut(fullPrintOut + " =");
      updateCalcInput(result);

      const newNumberSequence: keyType = {
        type: "number",
        value: result,
      };
      updateMainSequence([newNumberSequence]);
    }
  };

  useEffect(() => {
    const newNumberSequence = {
      type: "number",
      value: calcInput,
    };
    if (Number(calcInput)) {
      if (lastElementInSequence?.type === "number") {
        // update number
        const currentSequence = [...mainSequence];
        currentSequence[currentSequence.length - 1].value = calcInput;
        updateMainSequence(currentSequence);
      } else {
        // create new record
        updateMainSequence([...mainSequence, newNumberSequence]);
      }
    }
  }, [calcInput]);

  return (
    <div>
      <h1>react calculator</h1>
      <div id="calculator-wrapper">
        <Display
          calcInput={calcInput}
          handleChangeCalcInput={handleChangeCalcInput}
          printOut={printOut}
          handleKeyDown={handleKeyDown}
        />
        <FunctionKeys />
        <BasicOperationKeys />
        <NumberKeys keys={numberKeysData} />
        <HistoryLog />
      </div>
    </div>
  );
}

export default App;
