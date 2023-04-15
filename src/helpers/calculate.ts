import { sequenceType } from "../types";

const calculate = (sequence: sequenceType[]) => {
  const operation = sequence.find(({ type }) => type === "operation");
  const numbers = sequence.filter(({ type }) => type === "number");
  const errorMessage = "ERROR";
  let result;

  if (operation && numbers.length === 2) {
    const firstNumber = Number(numbers[0].value);
    const secondNumber = Number(numbers[1].value);

    switch (operation.value) {
      case "+":
        result = firstNumber + secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "/":
        result = firstNumber / secondNumber;
        break;
      case "*":
        result = firstNumber * secondNumber;
        break;
      default:
        result = "";
    }

    return result.toString();
  } else {
    return errorMessage;
  }
};

export default calculate;
