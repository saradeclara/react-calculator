import { sequenceType } from "../types";
import { historyLogType } from "./historyLog";

type NumberKeysProps = {
  keys: sequenceType[][];
  handleNumberClick: React.MouseEventHandler<HTMLDivElement>;
};

type BasicOperationKeysProps = {
  keys: sequenceType[];
  handleOperationClick: React.MouseEventHandler<HTMLDivElement>;
};

type DisplayProps = {
  calcInput: string;
  handleChangeCalcInput: React.ChangeEventHandler<HTMLInputElement>;
  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  printOut: string;
};

type FunctionKeysProps = {
  keys: sequenceType[];
  handleSquare: React.MouseEventHandler;
  handleSquareRt: React.MouseEventHandler;
  handleClear: React.MouseEventHandler;
  handleEqual: React.MouseEventHandler;
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
