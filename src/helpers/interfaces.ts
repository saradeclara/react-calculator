import { MouseEventHandler, ReactElement } from 'react';

export interface ButtonProps {
    source: ReactElement | string;
    onClick: MouseEventHandler<HTMLDivElement> | undefined;
}

export interface HistoryProps {
    log: historyLogRecord[];
}

export interface mainSequenceSingleType {
    value: string;
    type: string;
    index: number;
}

export interface firstOpType {
    mainSequence: mainSequenceSingleType[];
    rangeOfOperation: number[];
}

export interface newOperationType {
    firstNumber: number;
    secondNumber: number;
    operation: string;
}

export interface operationsType {
    value: ReactElement | string;
    label: string;
}

export interface historyLogRecord {
    stringOperation: string;
    result: string;
    nodeRef: any;
}
