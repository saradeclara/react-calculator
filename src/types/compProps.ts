import { sequenceType } from "../types";
import { historyLogType } from "./historyLog";

type NumberKeysProps = {
  keys: sequenceType[][];
  handleBtnClick: React.MouseEventHandler<HTMLDivElement>;
};

type BasicOperationKeysProps = {
  keys: sequenceType[];
  handleBtnClick: React.MouseEventHandler<HTMLDivElement>;
};

type DisplayProps = {
  calcInput: string;
  handleChangeCalcInput: React.ChangeEventHandler<HTMLInputElement>;
  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  printOut: string;
};

type FunctionKeysProps = {
  keys: sequenceType[];
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
