import { useState } from 'react';
import {
    numbers,
    primaryOperations,
    secondaryOperations,
} from '../data/calcData';
import calculate from '../helpers/calculate';
import Button from './Button';
import Window from './Window';

export default function Calculator() {
    const [calcInput, updateCalcInput] = useState('');
    const [inputPrintout, updatePrintout] = useState('');
    const [operationResult, updateOperationResult] = useState(0);

    const handleWindowChange = (event: React.BaseSyntheticEvent) => {
        updateCalcInput((prevCalcInput) =>
            event.target.validity.valid ? event.target.value : prevCalcInput
        );
    };

    const handleBtnClick = (char: string) => {
        updateCalcInput((prevCalcInput) => prevCalcInput + char);
    };

    const buttonRenderer = (data: string[]) => {
        return data.map((singleData) => {
            return (
                <Button
                    key={`key-${singleData}`}
                    onClick={() => handleBtnClick(singleData)}
                    source={singleData}
                />
            );
        });
    };

    const calculateOperation = () => {
        const result = calculate(calcInput);
        updateOperationResult(result);
    };

    const numbersRendered = buttonRenderer(numbers);
    const primaryOperationsRendered = buttonRenderer(primaryOperations);
    const secondaryOperationsRendered = buttonRenderer(secondaryOperations);

    return (
        <div className="main-app">
            <h1>Calculator</h1>
            <h2>Printout</h2>
            {inputPrintout}
            <h2>State</h2>
            {calcInput}
            <h2>Result</h2>
            {operationResult}
            <div className="main-calculator">
                <Window source={calcInput} onChange={handleWindowChange} />
                <Button source="=" onClick={calculateOperation} />
                <div className="button-wrapper">
                    <div className="secondary-and-numbers">
                        <div className="secondary">
                            {secondaryOperationsRendered}
                        </div>
                        <div className="numbers">{numbersRendered}</div>
                    </div>
                    <div className="primary">{primaryOperationsRendered}</div>
                </div>
            </div>
        </div>
    );
}
