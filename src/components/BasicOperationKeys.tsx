import { BasicOperationKeysProps } from "../types";

export default function BasicOperationKeys({
  handleBtnClick,
  keys,
}: BasicOperationKeysProps) {
  return (
    <div className="basic-operation-keys">
      {keys.map(({ type, value }, index) => {
        return (
          <div onClick={handleBtnClick} key={index} className="single-key">
            {value}
          </div>
        );
      })}
    </div>
  );
}
