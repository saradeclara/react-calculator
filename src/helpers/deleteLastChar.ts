const deleteLastChar = (string: string) => {
    let strToArr = string.split('');
    strToArr.pop();
    return strToArr.join('') === '' ? '0' : strToArr.join('');
};
export default deleteLastChar;
