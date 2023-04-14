import { keyType } from "../types";
import { historyLogType } from "./historyLog";

type NumberKeysProps = {
  keys: keyType[][];
};

type BasicOperationKeysProps = {
  keys: keyType[];
};

type DisplayProps = {
  calcInput: string;
  handleChangeCalcInput: React.ChangeEventHandler<HTMLInputElement>;
  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  printOut: string;
};

type FunctionKeysProps = {
  keys: keyType[];
};

type HistoryLogProps = {
  log: historyLogType[];
};

export type {
  BasicOperationKeysProps,
  DisplayProps,
  FunctionKeysProps,
  HistoryLogProps,
  NumberKeysProps,
};
