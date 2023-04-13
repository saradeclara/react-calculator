import React from "react";
import { FunctionKeysProps } from "../types";

export default function FunctionKeys({ keys }: FunctionKeysProps) {
  return (
    <div className="function-keys">
      {keys.map(({ type, value }, index) => {
        return (
          <div key={index} className="single-key">
            {value}
          </div>
        );
      })}
    </div>
  );
}
