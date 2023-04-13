import { BasicOperationKeysProps } from "../types";

export default function BasicOperationKeys({ keys }: BasicOperationKeysProps) {
  return (
    <div className="basic-operation-keys">
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
