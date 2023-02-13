import { mainSequenceSingleType, newOperationType } from './interfaces';

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

export default executeOperation;
