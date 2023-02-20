import { ReactElement } from 'react';

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
