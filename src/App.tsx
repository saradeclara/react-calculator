import { useState, useEffect, createRef } from "react";
import {
  BasicOperationKeys,
  Display,
  FunctionKeys,
  HistoryLog,
  NumberKeys,
} from "./components";
import { functionKeysData, numberKeysData } from "./data";
import { sequenceType } from "./types";
import { calculate, onlyOneOperation } from "./helpers";
import { basicOperationKeysData } from "./data/basicOperationKeysData";
import "./styles/App.scss";
import { historyLogType } from "./types";

const defaultPrintOut: string = "";
const defaultCalcInput: string = "";
const defaultMainSequence: sequenceType[] = [];
const defaultHistoryLog: historyLogType[] = [];

function App() {
  const [printOut, updatePrintOut] = useState(defaultPrintOut);
  const [calcInput, updateCalcInput] = useState(defaultCalcInput);
  const [mainSequence, updateMainSequence] = useState(defaultMainSequence);
  const [historyLog, updateHistoryLog] = useState(defaultHistoryLog);

  const operations: string[] = ["+", "-", "/", "*"];
  const lastElementInSequence: sequenceType =
    mainSequence[mainSequence.length - 1];
  const isOperationinMainSequence: sequenceType | undefined = [
    ...mainSequence,
  ].find(({ type }) => type === "operation");
  const onlyNumbersRegex = /^[0-9]*$/;

  // update calcInput (keyboard input)
  const handleChangeCalcInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const lastCharValue = value[value.length - 1];

    if (onlyNumbersRegex.test(value)) {
      if (lastElementInSequence?.type === "operation" && lastCharValue) {
        updateCalcInput(lastCharValue);
      } else {
        updateCalcInput(value);
      }
    } else {
      if (lastCharValue && operations.includes(lastCharValue)) {
        // check if there is already an operation in main sequence
        if (!isOperationinMainSequence) {
          const newOperationSequence: sequenceType = {
            value: lastCharValue,
            type: "operation",
          };
          updateMainSequence([...mainSequence, newOperationSequence]);

          updatePrintOut(calcInput + " " + lastCharValue);
        }
      }
    }
  };

  // update calcInput (mouse input)
  const handleBtnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newValue = e.currentTarget.innerText;
    updateCalcInput((prevState) => prevState + newValue);
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
      const newNumberSequence: sequenceType = {
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
            <NumberKeys handleBtnClick={handleBtnClick} keys={numberKeysData} />
            <BasicOperationKeys
              handleBtnClick={handleBtnClick}
              keys={basicOperationKeysData}
            />
          </div>
        </div>
        <HistoryLog log={historyLog} />
      </div>
    </div>
  );
}

export default App;
