import { executeOperation, findFirst } from './';
import { countDecimals } from './index';
import { firstOpType, mainSequenceSingleType } from './interfaces';

function calculate(string: string): string {
    let tempNumber: string[] = [];
    let mainSequence: mainSequenceSingleType[] = [];

    string.split('').forEach((char) => {
        if (Number(char) || char === '0') {
            // number
            tempNumber.push(char);
        } else {
            // operation sign
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
        }
    });

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
        return 'Error';
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
