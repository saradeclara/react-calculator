const deleteLastChar = (string: string) => {
    console.log('string', string, string.length);
    let strToArr = string.split('');
    strToArr.pop();
    return strToArr.join('') === '' ? '0' : strToArr.join('');
};
export default deleteLastChar;
