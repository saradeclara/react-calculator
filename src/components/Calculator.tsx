import { useState } from 'react';
import {
    numbers,
    primaryOperations,
    secondaryOperations,
} from '../data/calcData';
import { calculate } from '../helpers/';
import Button from './Button';
import Window from './Window';

export default function Calculator() {
    const defaultCalcInput = '0';
    const defaultPrintOut = '';
    const [calcInput, updateCalcInput] = useState(defaultCalcInput);
    const [printOut, updatePrintout] = useState(defaultPrintOut);

    const handleWindowChange = (event: React.BaseSyntheticEvent) => {
        console.log('value', event.target.value);
        let { value } = event.target;
        // remove leading zero when starting to type
        if (value.length > 1 && value[0] === '0') {
            let valueArray = value.split('');
            valueArray.shift();
            value = valueArray.join('');
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

    const buttonRenderer = (data: string[]) => {
        return data.map((singleData) => {
            const buttonOnClick =
                singleData === '='
                    ? calculateOperation
                    : () => handleBtnClick(singleData);
            return (
                <Button
                    key={`key-${singleData}`}
                    onClick={buttonOnClick}
                    source={singleData}
                />
            );
        });
    };

    const calculateOperation = () => {
        const result = calculate(calcInput);
        updatePrintout(calcInput + '=');
        updateCalcInput(result);
    };

    const numbersRendered = buttonRenderer(numbers);
    const primaryOperationsRendered = buttonRenderer(primaryOperations);
    const secondaryOperationsRendered = buttonRenderer(secondaryOperations);

    return (
        <div className="main-app">
            <div className="main-title">
                <h1>React Calculator</h1>
            </div>
            <div className="main-calculator">
                <div className="printout">{printOut}</div>
                <div className="main-window">
                    <Window source={calcInput} onChange={handleWindowChange} />
                </div>
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
