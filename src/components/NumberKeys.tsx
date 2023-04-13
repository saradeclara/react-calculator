import React from "react";
import { NumberKeysProps } from "../types";
import "../styles/NumberKeys.scss";

export default function NumberKeys({ keys }: NumberKeysProps) {
  return (
    <>
      <h2>NumberKeys</h2>
      {keys.map((keyRow, index) => {
        return (
          <div key={index} className="key-row">
            {keyRow.map(({ type, value }, index) => {
              return (
                <div key={index} className="single-key">
                  {value}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
