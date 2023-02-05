interface mainSequenceSingleType {
    value: string;
    type: string;
    index: number;
}

interface firstOpType {
    mainSequence: mainSequenceSingleType[];
    rangeOfOperation: number[];
}

interface newOperationType {
    firstNumber: number;
    secondNumber: number;
    operation: string;
}

/**
 *
 * @param array main sequence containing all numbers and operation signs that were parsed from original string
 * @returns an object (mainSequence) containing records of both arguments for the first operation to perform, plus the operation sign, and an array (rangeOfOperation) containing the indeces of both arguments and the operation sign from the first operation to perform
 */
function findFirst(array: mainSequenceSingleType[]) {
    const filteredOperation = array.filter(({ type }) => type === 'operation');

    const multOrDiv = filteredOperation.find(
        ({ value }) => value === '/' || value === '*'
    );

    // if there is no multiplication or division, pick first operation available
    const firstOperationSign = multOrDiv ?? filteredOperation[0];

    // this array includes indeces of both arguments of the operation
    // and the record containing the operation sign
    const rangeOfOperation = [
        firstOperationSign.index - 1,
        firstOperationSign.index,
        firstOperationSign.index + 1,
    ];

    return {
        mainSequence: array.filter(({ index }) =>
            rangeOfOperation.includes(index)
        ),
        rangeOfOperation: rangeOfOperation,
    };
}

/**
 * Function which executes mathematical operations
 * @param array sequence containing records of both arguments and the operation sign for the operation
 * @returns an object containing the result of the operation, the type of data (number), and its new index
 */
const executeOperation = (array: mainSequenceSingleType[]) => {
    const numbers = array.filter(({ type }) => type === 'number');
    const operationSign = array.find(({ type }) => type === 'operation');
    let operationResult: number = 0;

    if (operationSign) {
        const newOperation: newOperationType = {
            firstNumber: Number(numbers[0].value),
            secondNumber: Number(numbers[1].value),
            operation: operationSign.value,
        };

        const { firstNumber, secondNumber, operation } = newOperation;

        switch (operation) {
            case '+':
                operationResult = firstNumber + secondNumber;
                break;
            case '-':
                operationResult = firstNumber - secondNumber;
                break;
            case '/':
                operationResult = firstNumber / secondNumber;
                break;
            case '*':
                operationResult = firstNumber * secondNumber;
                break;
            default:
                break;
        }
    }

    return {
        value: operationResult.toString(),
        type: 'number',
        index: array[0].index,
    };
};

function calculate(string: string): any {
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

    const finalResult = mainSequence[0].value;

    return finalResult;
}
export default calculate;
