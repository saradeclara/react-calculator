import React from "react";
import { NumberKeysProps } from "../types";
import "../styles/NumberKeys.scss";

export default function NumberKeys({ keys }: NumberKeysProps) {
  return (
    <>
      <h2>NumberKeys</h2>
      {keys.map((keyRow) => {
        return (
          <div className="key-row">
            {keyRow.map(({ type, value }) => {
              return <div className="single-key">{value}</div>;
            })}
          </div>
        );
      })}
    </>
  );
}
