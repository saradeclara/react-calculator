import { useState, useEffect } from "react";
import {
	BasicOperationKeys,
	Display,
	FunctionKeys,
	HistoryLog,
	NumberKeys,
} from "./components";
import { numberKeysData } from "./data";
import { sequenceType } from "./types";
import "./styles/App.scss";
import { historyLogType } from "./types";
import { functionKeysData } from "./components/FunctionKeys";
import {
	calculateOperation,
	handleClear,
	handleEqual,
	handleSignSwitch,
	handleSquare,
	handleSquareRt,
} from "./helpers/handlers";

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
			calculateOperation(
				mainSequence,
				updateMainSequence,
				updateCalcInput,
				updateCalcInput,
				historyLog,
				updateHistoryLog
			);
		}
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
						handleClear={() =>
							handleClear(
								defaultPrintOut,
								defaultCalcInput,
								updatePrintOut,
								updateCalcInput
							)
						}
						handleEqual={() =>
							handleEqual(
								mainSequence,
								updateMainSequence,
								updateCalcInput,
								updateCalcInput,
								historyLog,
								updateHistoryLog
							)
						}
						handleSquare={() => handleSquare(calcInput, updateCalcInput)}
						handleSquareRt={() => handleSquareRt(calcInput, updateCalcInput)}
					/>
					<div id="number-operation-wrapper">
						<NumberKeys
							handleNumberClick={handleNumberClick}
							handleSignSwitch={() =>
								handleSignSwitch(calcInput, updateCalcInput)
							}
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
