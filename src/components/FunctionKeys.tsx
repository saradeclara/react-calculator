import React from "react";
import { FunctionKeysProps } from "../types";

export default function FunctionKeys({
  keys,
  handleSquare,
  handleSquareRt,
  handleClear,
  handleEqual,
}: FunctionKeysProps) {
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
          <div key={index} onClick={handler} className="single-key">
            {value}
          </div>
        );
      })}
    </div>
  );
}
