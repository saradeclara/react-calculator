import { useState } from 'react';
import { numbers, operations } from '../data/calcData';
import calculate from '../helpers/calculate';
import Button from './Button';
import Window from './Window';

export default function Calculator() {
    const [calcInput, updateCalcInput] = useState('');
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
    const operationsRendered = buttonRenderer(operations);

    return (
        <div>
            <h1>Calculator</h1>
            <h2>State</h2>
            {calcInput}
            <h2>Result</h2>
            {operationResult}
            <div className="main-calculator-body">
                {numbersRendered}
                {operationsRendered}
                <Window source={calcInput} onChange={handleWindowChange} />
                <Button source="=" onClick={calculateOperation} />
            </div>
        </div>
    );
}
