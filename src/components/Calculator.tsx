import React, { SyntheticEvent, useState } from 'react';
import { numbers, operations } from '../data/calcData';
import Button from './Button';
import Window from './Window';

export default function Calculator() {
    const [calcInput, updateCalcInput] = useState('');

    const updateCalc = (newValue: string) => {
        // update new value when typing
        // concatenate strings when using calc buttons
        // updateCalcInput(newValue);
    };

    const handleButtonClick = (data: string) => {
        console.log('clicked', data);
        updateCalc(data);
    };

    const onInputChange = (e: any) => {
        // santise string
        // only numbers and operation signs allowed
        console.log('event', e.target.value, typeof e.target.value);
        const newValue = e.target.value;

        // if (
        // operations.includes(newValue) ||
        // numbers.includes(newValue) ||
        // Number(newValue)
        // ) {
        updateCalc(newValue);
        // console.log('allowed', newValue);
        // } else {
        // console.log('not allowed', newValue);
        // }
    };

    const buttonRenderer = (data: string[]) => {
        return data.map((singleData) => {
            return (
                <Button
                    key={`key-${singleData}`}
                    onClick={() => handleButtonClick(singleData)}
                    source={singleData}
                />
            );
        });
    };

    return (
        <div>
            <h1>Calculator</h1>
            {buttonRenderer(numbers)}
            {buttonRenderer(operations)}
            <Window source={calcInput} onChange={onInputChange} />
        </div>
    );
}
