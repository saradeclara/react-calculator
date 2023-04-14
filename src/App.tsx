import { useState, useEffect, createRef } from "react";
import {
  BasicOperationKeys,
  Display,
  FunctionKeys,
  HistoryLog,
  NumberKeys,
} from "./components";
import { functionKeysData, numberKeysData } from "./data";
import { keyType } from "./types";
import { calculate } from "./helpers";
import { basicOperationKeysData } from "./data/basicOperationKeysData";
import "./styles/App.scss";
import { historyLogType } from "./types";

const defaultPrintOut: string = "";
const defaultCalcInput: string = "";
const defaultMainSequence: keyType[] = [];
const defaultHistoryLog: historyLogType[] = [];

function App() {
  const [printOut, updatePrintOut] = useState(defaultPrintOut);
  const [calcInput, updateCalcInput] = useState(defaultCalcInput);
  const [mainSequence, updateMainSequence] = useState(defaultMainSequence);
  const [historyLog, updateHistoryLog] = useState(defaultHistoryLog);

  const operations = ["+", "-", "/", "*"];
  const lastElementInSequence = mainSequence[mainSequence.length - 1];
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
      // calculate operation
      const result = calculate(mainSequence);
      const fullPrintOut = mainSequence.map(({ value }) => value).join(" ");
      updatePrintOut(fullPrintOut + " =");
      updateCalcInput(result);

      // update main sequence
      const newNumberSequence: keyType = {
        type: "number",
        value: result,
      };
      updateMainSequence([newNumberSequence]);

      // update history log
      const newHistoryLogEntry: historyLogType = {
        result,
        operation: fullPrintOut + " =",
        nodeRef: createRef(),
      };
      updateHistoryLog([...historyLog, newHistoryLogEntry]);
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
      <div id="app-wrapper">
        <div id="calculator-wrapper">
          <Display
            calcInput={calcInput}
            handleChangeCalcInput={handleChangeCalcInput}
            printOut={printOut}
            handleKeyDown={handleKeyDown}
          />
          <FunctionKeys keys={functionKeysData} />
          <div id="number-operation-wrapper">
            <NumberKeys keys={numberKeysData} />
            <BasicOperationKeys keys={basicOperationKeysData} />
          </div>
        </div>
        <HistoryLog log={historyLog} />
      </div>
    </div>
  );
}

export default App;
