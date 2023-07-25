export const extractValuesFromInputsChildren = (parentElement: HTMLElement) => {
  const inputsChildren = parentElement.getElementsByTagName('input');

  return Array.from(inputsChildren).map(input => {
    const parsedValue = Number(input.value) || 0;
    input.value = '';

    return parsedValue;
  });
};
