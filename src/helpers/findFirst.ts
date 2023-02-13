import { mainSequenceSingleType } from './interfaces';

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

export default findFirst;
