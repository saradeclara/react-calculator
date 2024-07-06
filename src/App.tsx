import { useState, useEffect, createRef } from "react";
import {
	BasicOperationKeys,
	Display,
	FunctionKeys,
	HistoryLog,
	NumberKeys,
} from "./components";
import { numberKeysData } from "./data";
import { sequenceType } from "./types";
import { calculate } from "./helpers";
import "./styles/App.scss";
import { historyLogType } from "./types";
import { functionKeysData } from "./components/FunctionKeys";

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

		const numbersInSequence: sequenceType[] | undefined = [
			...mainSequence,
		].filter(({ type }) => type === "number");

		if (numbersInSequence.length === 1 && operationsInSequence) {
			updateCalcInput(newValue);
		} else {
			updateCalcInput((prevState) =>
				prevState === "0" ? newValue : prevState + newValue
			);
		}
	};

	// trigger 'calculate' function when pressing '=' button
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.key === "=") {
			calculateOperation();
		}
	};

	/**
	 * The handleSignSwitch function toggles the sign of the current input value in a TypeScript React
	 * application.
	 */
	const handleSignSwitch = () => {
		const switchedSign = Number(calcInput) * -1;
		updateCalcInput(switchedSign.toString());
	};

	/**
	 * The `handleClear` function resets the print out and calculation input to their default values.
	 */
	const handleClear = () => {
		updatePrintOut(defaultPrintOut);
		updateCalcInput(defaultCalcInput);
	};

	/**
	 * The handleEqual function in TypeScript React calls the calculateOperation function.
	 */
	const handleEqual = () => {
		calculateOperation();
	};

	/**
	 * The `handleSquare` function calculates the square of a number input and updates the input with the
	 * result.
	 */
	const handleSquare = () => {
		const square = Number(calcInput) * Number(calcInput);
		updateCalcInput(square.toString());
	};

	/**
	 * The function calculates the square root of the input number and updates the calculation input with
	 * the result.
	 */
	const handleSquareRt = () => {
		const squareroot = Math.sqrt(Number(calcInput));
		updateCalcInput(squareroot.toString());
	};

	/* This `useEffect` hook is responsible for updating the `mainSequence` state based on changes in the
  `calcInput` state. Here's a breakdown of what it does: */
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
		<div id="main-wrapper">
			<div id="main-bg"></div>
			<div id="overlay"></div>
			<h1 id="main-heading" data-fill-text="reactulator">
				reactulator
			</h1>
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
							updatePrintOut={updatePrintOut}
							updateMainSequence={updateMainSequence}
							updateCalcInput={updateCalcInput}
							mainSequence={mainSequence}
							defaultCalcInput={defaultCalcInput}
						/>
					</div>
				</div>
				<HistoryLog log={historyLog} />
			</div>
		</div>
	);
}

export default App;
