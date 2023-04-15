const onlyOneOperation = (string: string) => {
  const operations = ["+", "-", "/", "*"];
  const filteredChars = string
    .split("")
    .filter((char: string) => operations.includes(char));
  console.log(filteredChars);
  return filteredChars.length === 1;
};

export default onlyOneOperation;
