import { BasicOperationKeysProps } from "../types";

export default function BasicOperationKeys({
  handleOperationClick,
  keys,
}: BasicOperationKeysProps) {
  return (
    <div className="basic-operation-keys">
      {keys.map(({ type, value }, index) => {
        return (
          <div
            onClick={handleOperationClick}
            key={index}
            className="single-key"
          >
            {value}
          </div>
        );
      })}
    </div>
  );
}
