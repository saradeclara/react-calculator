import { createRef, useState } from 'react';
import { calculate, deleteLastChar } from '../helpers/';
import { FiDelete } from 'react-icons/fi';
import { historyLogRecord, operationsType } from '../helpers/interfaces';
import { ReactElement } from 'react';
import { Button, Window, History } from './';

export default function Calculator() {
    const defaultCalcInput = '0';
    const defaultPrintOut = '';
    const defaultHistoryLog: historyLogRecord[] = [];
    const [calcInput, updateCalcInput] = useState(defaultCalcInput);
    const [printOut, updatePrintout] = useState(defaultPrintOut);
    const [historyLog, updateHistoryLog] = useState(defaultHistoryLog);

    const numbers: string[][] = [
        ['7', '8', '9'],
        ['4', '5', '6'],
        ['1', '2', '3'],
        ['+/-', '0', '.'],
    ];

    const primaryOperations: operationsType[] = [
        {
            value: <FiDelete />,
            label: 'delete',
        },
        {
            value: '/',
            label: 'division',
        },
        {
            value: '*',
            label: 'multiplication',
        },
        {
            value: '-',
            label: 'subtraction',
        },
        {
            value: '+',
            label: 'sum',
        },
        {
            value: '=',
            label: 'equal',
        },
    ];

    const secondaryOperations: operationsType[][] = [
        [
            {
                value: '%',
                label: 'percentage',
            },
            {
                value: 'PI',
                label: 'pi',
            },
            {
                value: 'C',
                label: 'clear',
            },
        ],
        [
            {
                value: '1/x',
                label: 'inverse',
            },
            {
                value: 'x^2',
                label: 'square',
            },
            {
                value: 'sqrt(x)',
                label: 'squareroot',
            },
        ],
    ];

    // HANDLERS

    const handleWindowChange = (event: React.BaseSyntheticEvent) => {
        let { value } = event.target;
        // remove leading zero when starting to type
        if (value.length > 1 && value[0] === '0') {
            let valueArray = value.split('');
            valueArray.shift();
            value = valueArray.join('');
        }
        if (value === '') {
            // reset to zero if deleting manually
            value = '0';
        }
        updateCalcInput((prevCalcInput) =>
            event.target.validity.valid ? value : prevCalcInput
        );
    };

    const handleBtnClick = (char: string) => {
        updateCalcInput((prevCalcInput) =>
            // remove leading zero when starting to type
            prevCalcInput.length === 1 && prevCalcInput === '0'
                ? char
                : prevCalcInput + char
        );
    };

    const handleDeleteBtn = () => {
        updateCalcInput((prevCalcInput) => deleteLastChar(prevCalcInput));
    };

    const handleInverse = () => {
        const inverseOperation = `1/${calcInput}`;
        calculateOperation(inverseOperation);
    };

    const handleSquare = () => {
        const squareOperation = `sqr(${calcInput})`;
        calculateOperation(squareOperation);
    };

    const handleSquareRoot = () => {
        const squareRootOperation = `sqrt(${calcInput})`;
        calculateOperation(squareRootOperation);
    };

    const handleKeyUp = (event: { keyCode: number }) => {
        // trigger calculateOperation when pressing ENTER
        if (event.keyCode === 13) {
            calculateOperation(calcInput);
        }
        // trigger handleDeleteBtn when pressing DELETE
        if (event.keyCode === 8) {
            handleDeleteBtn();
        }
    };

    // HELPERS

    const calculateOperation = (stringOperation: string) => {
        const result = calculate(stringOperation);
        updatePrintout(stringOperation + '=');
        updateCalcInput(result);
        const newHistoryLog: historyLogRecord = {
            stringOperation: stringOperation + '=',
            result,
            nodeRef: createRef(),
        };
        updateHistoryLog([...historyLog, newHistoryLog]);
        return result;
    };

    const chooseBtnFunction = (value: string | ReactElement, label: string) => {
        switch (label) {
            case 'delete':
                return handleDeleteBtn;
            case 'equal':
                return () => calculateOperation(calcInput);
            case 'inverse':
                return handleInverse;
            case 'square':
                return handleSquare;
            case 'squareroot':
                return handleSquareRoot;
            default:
                return typeof value === 'string'
                    ? () => handleBtnClick(value)
                    : undefined;
        }
    };

    // RENDERERS

    const numberRender = (data: string[][]) => {
        return data.map((singleRow, index) => {
            return (
                <div className="singleRow" key={`key-singleRow-${index}`}>
                    {singleRow.map((singleNumber) => {
                        return (
                            <Button
                                key={`key-${singleNumber}`}
                                onClick={() => handleBtnClick(singleNumber)}
                                source={singleNumber}
                            />
                        );
                    })}
                </div>
            );
        });
    };

    const primaryOperationsRender = (data: operationsType[]) => {
        return data.map(({ value, label }) => {
            const onClickFunction = chooseBtnFunction(value, label);
            return (
                <Button
                    key={`key-${label}`}
                    source={value}
                    onClick={onClickFunction}
                />
            );
        });
    };

    const secondaryOperationsRender = (data: operationsType[][]) => {
        return data.map((singleRow, index) => {
            return (
                <div
                    className="singleRow"
                    key={`key-singleRow-secondary-${index}`}
                >
                    {singleRow.map(({ value, label }) => {
                        const onClickFunction = chooseBtnFunction(value, label);
                        return (
                            <Button
                                key={`key-${label}`}
                                source={value}
                                onClick={onClickFunction}
                            />
                        );
                    })}
                </div>
            );
        });
    };

    const numbersRendered = numberRender(numbers);
    const primaryOperationsRendered =
        primaryOperationsRender(primaryOperations);
    const secondaryOperationsRendered =
        secondaryOperationsRender(secondaryOperations);

    return (
        <div className="main-app">
            <div className="main-title">
                <h1>React Calculator</h1>
                <h2>by Sara De Clara</h2>
            </div>
            <div className="main-calculator">
                <div className="window-button-wrapper">
                    <div className="window-printout">
                        <div className="printout">{printOut}</div>
                        <div className="main-window">
                            <Window
                                source={calcInput}
                                onKeyUp={handleKeyUp}
                                onChange={handleWindowChange}
                            />
                        </div>
                    </div>
                    <div className="button-wrapper">
                        <div className="secondary-and-numbers">
                            <div className="secondary">
                                {secondaryOperationsRendered}
                            </div>
                            <div className="numbers">{numbersRendered}</div>
                        </div>
                        <div className="primary">
                            {primaryOperationsRendered}
                        </div>
                    </div>
                </div>
                <History log={historyLog} />
            </div>
        </div>
    );
}
