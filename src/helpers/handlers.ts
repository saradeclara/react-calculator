import { createRef, Dispatch, SetStateAction } from "react";
import { historyLogType, sequenceType } from "../types";
import calculate from "./calculate";

// calculate operation, reset all inputs and add entry to history log
const calculateOperation = (
	mainSequence: sequenceType[],
	updateMainSequence: Dispatch<SetStateAction<sequenceType[]>>,
	updatePrintOut: Dispatch<SetStateAction<string>>,
	updateCalcInput: Dispatch<SetStateAction<string>>,
	historyLog: historyLogType[],
	updateHistoryLog: Dispatch<SetStateAction<historyLogType[]>>
) => {
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

/**
 * The handleEqual function in TypeScript React calls the calculateOperation function.
 */
const handleEqual = (
	mainSequence: sequenceType[],
	updateMainSequence: Dispatch<SetStateAction<sequenceType[]>>,
	updatePrintOut: Dispatch<SetStateAction<string>>,
	updateCalcInput: Dispatch<SetStateAction<string>>,
	historyLog: historyLogType[],
	updateHistoryLog: Dispatch<SetStateAction<historyLogType[]>>
) => {
	calculateOperation(
		mainSequence,
		updateMainSequence,
		updatePrintOut,
		updateCalcInput,
		historyLog,
		updateHistoryLog
	);
};

/**
 * The function calculates the square root of the input number and updates the calculation input with
 * the result.
 */
const handleSquareRt = (
	calcInput: string,
	updateCalcInput: Dispatch<SetStateAction<string>>
) => {
	const squareroot = Math.sqrt(Number(calcInput));
	updateCalcInput(squareroot.toString());
};

/**
 * The `handleSquare` function calculates the square of a number input and updates the input with the
 * result.
 */
const handleSquare = (
	calcInput: string,
	updateCalcInput: Dispatch<SetStateAction<string>>
) => {
	const square = Number(calcInput) * Number(calcInput);
	updateCalcInput(square.toString());
};

/**
 * The handleSignSwitch function toggles the sign of the current input value in a TypeScript React
 * application.
 */
const handleSignSwitch = (
	calcInput: string,
	updateCalcInput: Dispatch<SetStateAction<string>>
) => {
	const switchedSign = Number(calcInput) * -1;
	updateCalcInput(switchedSign.toString());
};

/**
 * The `handleClear` function resets the print out and calculation input to their default values.
 */
const handleClear = (
	defaultPrintOut: string,
	defaultCalcInput: string,
	updatePrintOut: Dispatch<SetStateAction<string>>,
	updateCalcInput: Dispatch<SetStateAction<string>>
) => {
	updatePrintOut(defaultPrintOut);
	updateCalcInput(defaultCalcInput);
};

export {
	handleSquareRt,
	handleSquare,
	handleEqual,
	calculateOperation,
	handleClear,
	handleSignSwitch,
};
