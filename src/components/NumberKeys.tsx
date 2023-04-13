import { NumberKeysProps } from "../types";

export default function NumberKeys({ keys }: NumberKeysProps) {
  return (
    <div className="number-keys">
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
    </div>
  );
}
