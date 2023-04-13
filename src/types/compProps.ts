import { keyType } from "../types";

type NumberKeysProps = {
  keys: keyType[][];
};

type DisplayProps = {
  calcInput: string;
  handleChangeCalcInput: React.ChangeEventHandler<HTMLInputElement>;
  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  printOut: string;
};

export type { DisplayProps, NumberKeysProps };
