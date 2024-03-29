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
import { calculate } from "./helpers";
import { basicOperationKeysData } from "./data/basicOperationKeysData";
import "./styles/App.scss";
import { historyLogType } from "./types";

const defaultPrintOut: string = "";
const defaultCalcInput: string = "0";
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
  const operationsInSequence: sequenceType | undefined = [...mainSequence].find(
    ({ type }) => type === "operation"
  );
  const numbersInSequence: sequenceType[] | undefined = [
    ...mainSequence,
  ].filter(({ type }) => type === "number");
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
        if (!operationsInSequence) {
          const newOperationSequence: sequenceType = {
            value: lastCharValue,
            type: "operation",
          };
          updateMainSequence([...mainSequence, newOperationSequence]);
          updateCalcInput(defaultCalcInput);
          updatePrintOut(calcInput + " " + lastCharValue);
        }
      }
    }

    if (calcInput === "0") {
      updateCalcInput(lastCharValue);
    }
  };

  // calculate operation, reset all inputs and add entry to history log
  const calculateOperation = () => {
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
  };

  // update calcInput (mouse input)
  const handleNumberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newValue: string = e.currentTarget.innerText;

    if (numbersInSequence.length === 1 && operationsInSequence) {
      updateCalcInput(newValue);
    } else {
      updateCalcInput((prevState) =>
        prevState === "0" ? newValue : prevState + newValue
      );
    }
  };

  // handle operation btn functionality (mouse input)
  const handleOperationClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newOperation: string = e.currentTarget.innerText;

    // check that the first number has been added to main sequence
    if (numbersInSequence.length === 1 && mainSequence.length === 1) {
      const firstNumber = numbersInSequence[0].value;
      const newOperationSequence: sequenceType = {
        type: "operation",
        value: newOperation,
      };
      updateMainSequence([...mainSequence, newOperationSequence]);
      updateCalcInput(defaultCalcInput);
      updatePrintOut(firstNumber + " " + newOperation);
    }
  };

  // trigger 'calculate' function when pressing '=' button
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "=") {
      calculateOperation();
    }
  };

  const handleSignSwitch = () => {
    const switchedSign = Number(calcInput) * -1;
    updateCalcInput(switchedSign.toString());
  };

  const handleClear = () => {
    updatePrintOut(defaultPrintOut);
    updateCalcInput(defaultCalcInput);
  };

  const handleEqual = () => {
    calculateOperation();
  };

  const handleSquare = () => {
    const square = Number(calcInput) * Number(calcInput);
    updateCalcInput(square.toString());
  };

  const handleSquareRt = () => {
    const squareroot = Math.sqrt(Number(calcInput));
    updateCalcInput(squareroot.toString());
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
    // eslint-disable-next-line
  }, [calcInput]);

  return (
    <div>
      <h1>react calculator</h1>
      <h4>by Sara De Clara</h4>
      <div id="app-wrapper">
        <div id="calculator-wrapper">
          <Display
            calcInput={calcInput}
            handleChangeCalcInput={handleChangeCalcInput}
            printOut={printOut}
            handleKeyDown={handleKeyDown}
          />
          <FunctionKeys
            keys={functionKeysData}
            handleClear={handleClear}
            handleEqual={handleEqual}
            handleSquare={handleSquare}
            handleSquareRt={handleSquareRt}
          />
          <div id="number-operation-wrapper">
            <NumberKeys
              handleNumberClick={handleNumberClick}
              handleSignSwitch={handleSignSwitch}
              keys={numberKeysData}
            />
            <BasicOperationKeys
              handleOperationClick={handleOperationClick}
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
