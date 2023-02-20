function countDecimals(number: number): number {
    if (Math.floor(number) === number) {
        return 0;
    } else {
        const stringified = number.toString();
        const floatFound = stringified.indexOf('.');
        if (floatFound !== -1) {
            const stringToArray = stringified.split('').splice(floatFound);
            stringToArray.shift();
            return stringToArray.length;
        }
        return 0;
    }
}

export default countDecimals;
