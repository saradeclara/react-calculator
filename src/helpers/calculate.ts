import { executeOperation, findFirst } from './';
import { countDecimals } from './index';
import { firstOpType, mainSequenceSingleType } from './interfaces';

const errorMessage = 'ERROR';

function calculate(string: string): string {
    let tempNumber: string[] = [];
    let mainSequence: mainSequenceSingleType[] = [];
    console.log('string', string);
    for (let index = 0; index < string.split('').length; index++) {
        const char = string.split('')[index];
        console.log('char', char);
        if (Number(char) || char === '0') {
            // number
            tempNumber.push(char);
        } else {
            // operation sign
            if (['-', '+', '*', '/'].includes(char)) {
                const newNumber = tempNumber.join('');

                // add number to the left of the operation sign to the parserResult array
                const newNumberSequence: mainSequenceSingleType = {
                    value: newNumber,
                    type: 'number',
                    index: mainSequence.length,
                };

                // add operation sign to the parserResult array
                const newOperationSequence: mainSequenceSingleType = {
                    value: char,
                    type: 'operation',
                    index: mainSequence.length + 1,
                };

                mainSequence.push(newNumberSequence, newOperationSequence);

                // reset tempNumber for next round
                tempNumber = [];
            } else {
                // check if it's square root
                if (string.includes('sqrt')) {
                } else {
                    // check if it's square
                    if (string.includes('sqr')) {
                        // find closing parentheses
                        const lastParentheses = string.indexOf(')');
                        const value = string
                            .split('')
                            .splice(0, lastParentheses + 1)
                            .join('');
                        const newSquareSequence: mainSequenceSingleType = {
                            value,
                            type: 'square',
                            index: mainSequence.length,
                        };
                        console.log('SQUARE', newSquareSequence);
                        mainSequence.push(newSquareSequence);
                        break;
                    } else {
                        console.log(errorMessage);
                        return errorMessage;
                    }
                }
            }
        }
    }

    // add last number contained in tempNumber array
    if (tempNumber.length > 0) {
        const lastNumber = tempNumber.join('');
        const lastNumberSequence: mainSequenceSingleType = {
            value: lastNumber,
            type: 'number',
            index: mainSequence.length,
        };
        mainSequence.push(lastNumberSequence);
    }

    // establish how many operations need to be performed
    const nOfRounds = mainSequence.filter(({ type }) => type === 'operation');
    console.log('nOfRounds', nOfRounds.length, mainSequence);

    if (nOfRounds.length === 0) {
        // check for squares or square roots
        const squares = mainSequence.filter(({ type }) => type === 'square');
        if (squares.length > 0) {
            // extract number from string
            const stringValueToArray = squares[0].value.split('');
            let number: string[] = [];
            stringValueToArray.forEach((char) => {
                if (Number(char)) {
                    number.push(char);
                }
            });
            const numberFound = Number(number.join(''));
            const value = Math.pow(numberFound, 2).toString();
            console.log('value', value);
            const newSequence: mainSequenceSingleType[] = [
                {
                    value,
                    index: mainSequence.length,
                    type: 'number',
                },
            ];

            mainSequence = newSequence;
        }
    }
    // perform calculation for each operation found
    nOfRounds.forEach((_) => {
        // find first operation
        // prioritise * and /
        const firstOp: firstOpType = findFirst(mainSequence);
        const result: mainSequenceSingleType = executeOperation(
            firstOp.mainSequence
        );

        // remove records containing elements used for operation above
        // and insert record with new result into main array
        let newSequence = mainSequence.filter(
            ({ index }) => !firstOp.rangeOfOperation.includes(index)
        );
        newSequence.splice(result.index, 0, result);

        // fix indeces
        newSequence = newSequence.map((singleValue, primaryIndex) => {
            return singleValue.index === primaryIndex
                ? singleValue
                : { ...singleValue, index: primaryIndex };
        });

        // substitute previous sequence with new updated sequence
        mainSequence = newSequence;
    });

    if (mainSequence.length !== 1) {
        return errorMessage;
    }

    let finalResult = mainSequence[0].value;

    // truncate floats
    const decimals = countDecimals(Number(finalResult));
    if (decimals > 13) {
        finalResult = Number(finalResult).toFixed(13).toString();
    }

    return finalResult;
}

export default calculate;
