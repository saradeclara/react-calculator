import { mainSequenceSingleType } from './interfaces';

const createSequence = (
    string: string,
    mainSequence: mainSequenceSingleType[],
    label: string
) => {
    const lastParentheses = string.indexOf(')');
    const value = string
        .split('')
        .splice(0, lastParentheses + 1)
        .join('');
    const newSequence: mainSequenceSingleType = {
        value,
        type: label,
        index: mainSequence.length,
    };

    return newSequence;
};

export default createSequence;
