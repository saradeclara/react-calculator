const extractString = (string: string) => {
    const stringValueToArray = string.split('');
    let number: string[] = [];
    stringValueToArray.forEach((char) => {
        if (Number(char) || char === '0') {
            number.push(char);
        }
    });
    return number;
};

export default extractString;
