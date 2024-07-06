import {
	CgAsterisk,
	CgMathDivide,
	CgMathMinus,
	CgMathPlus,
} from "react-icons/cg";
import { sequenceType } from "../types";
import { Dispatch, SetStateAction } from "react";

export default function BasicOperationKeys({
	mainSequence,
	updateMainSequence,
	updateCalcInput,
	updatePrintOut,
	defaultCalcInput,
}: {
	mainSequence: sequenceType[];
	updateMainSequence: Dispatch<SetStateAction<sequenceType[]>>;
	updateCalcInput: Dispatch<SetStateAction<string>>;
	updatePrintOut: Dispatch<SetStateAction<string>>;
	defaultCalcInput: string;
}) {
	const keys: sequenceType[] = [
		{ type: "operation", label: "+", value: <CgMathPlus /> },
		{ type: "operation", label: "-", value: <CgMathMinus /> },
		{ type: "operation", label: "*", value: <CgAsterisk /> },
		{ type: "operation", label: "/", value: <CgMathDivide /> },
	];

	// handle operation btn functionality (mouse input)
	const handleOperationClick = (label: string) => {
		const newOperation: string = label;

		console.log({ newOperation });

		const numbersInSequence: sequenceType[] | undefined = [
			...mainSequence,
		].filter(({ type }) => type === "number");

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

	return (
		<div className="basic-operation-keys">
			{keys.map(({ value, label }, index) => {
				return label ? (
					<div
						onClick={() => handleOperationClick(label)}
						key={index}
						className="single-key operations"
					>
						{value}
					</div>
				) : null;
			})}
		</div>
	);
}
