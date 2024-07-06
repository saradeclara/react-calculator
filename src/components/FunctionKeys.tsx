import React from "react";
import { FunctionKeysProps, sequenceType } from "../types";
import { CgMathEqual } from "react-icons/cg";
import SquaredSymbol from "./SquaredSymbol";
import { TbSquareRoot2 } from "react-icons/tb";

export const functionKeysData: sequenceType[] = [
	{ type: "square", value: <SquaredSymbol /> },
	{ type: "squarert", value: <TbSquareRoot2 /> },
	{ type: "clear", value: "C" },
	{ type: "equal", value: <CgMathEqual /> },
];

export default function FunctionKeys({
	keys,
	handleSquare,
	handleSquareRt,
	handleClear,
	handleEqual,
}: FunctionKeysProps) {
	/**
	 * The function `chooseHandlers` takes a string input and returns a React MouseEventHandler based on
	 * the input type.
	 * @param {string} type - The `type` parameter in the `chooseHandlers` function is a string that
	 * determines which handler function to choose based on the type provided.
	 * @returns The `chooseHandlers` function returns a React MouseEventHandler based on the input `type`.
	 * The returned handler could be `handleSquare`, `handleSquareRt`, `handleClear`, or `handleEqual`
	 * depending on the value of `type`.
	 */
	const chooseHandlers = (type: string) => {
		let result: React.MouseEventHandler;
		switch (type) {
			case "square":
				result = handleSquare;
				break;
			case "squarert":
				result = handleSquareRt;
				break;
			case "clear":
				result = handleClear;
				break;
			default:
				result = handleEqual;
		}

		return result;
	};

	return (
		<div className="function-keys">
			{keys.map(({ type, value }, index) => {
				const handler = chooseHandlers(type);
				return (
					<div key={index} onClick={handler} className="single-key function">
						{value}
					</div>
				);
			})}
		</div>
	);
}
