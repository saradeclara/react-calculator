import { createSequence, executeOperation, extractString, findFirst } from './';
import { countDecimals } from './index';
import { firstOpType, mainSequenceSingleType } from './interfaces';

const errorMessage = 'ERROR';
export const decimalLimit = 10;

function calculate(string: string): string {
    let tempNumber: string[] = [];
    let mainSequence: mainSequenceSingleType[] = [];
    for (let index = 0; index < string.split('').length; index++) {
        const char = string.split('')[index];
        if (Number(char) || char === '0' || char === '.') {
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
                    const newSquareRootSequence = createSequence(
                        string,
                        mainSequence,
                        'squareroot'
                    );
                    mainSequence.push(newSquareRootSequence);
                    break;
                } else {
                    // check if it's square
                    if (string.includes('sqr')) {
                        const newSquareSequence = createSequence(
                            string,
                            mainSequence,
                            'square'
                        );
                        mainSequence.push(newSquareSequence);
                        break;
                    } else {
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

    if (nOfRounds.length === 0) {
        // check for squares or square roots
        const squares = mainSequence.filter(({ type }) => type === 'square');
        if (squares.length > 0) {
            const number = extractString(squares[0].value);

            const numberFound = Number(number.join(''));
            const value = Math.pow(numberFound, 2).toString();
            const newSequence: mainSequenceSingleType[] = [
                {
                    value,
                    index: mainSequence.length,
                    type: 'number',
                },
            ];

            mainSequence = newSequence;
        } else {
            const squareRoots = mainSequence.filter(
                ({ type }) => type === 'squareroot'
            );
            if (squareRoots.length > 0) {
                const number = extractString(squareRoots[0].value);

                const numberFound = Number(number.join(''));
                const value = Math.sqrt(numberFound).toString();
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
    if (decimals > decimalLimit) {
        finalResult = Number(finalResult).toFixed(decimalLimit).toString();
    }

    return finalResult;
}

export default calculate;
