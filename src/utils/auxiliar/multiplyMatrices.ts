export const multiplyMatrices = (
  firstMatrix: number[][],
  secondMatrix: number[][],
) => {
  const firstRowsQuantity = firstMatrix.length;
  const firstColumnsQuantity = firstMatrix[0].length;
  const secondColumnsQuantity = secondMatrix[0].length;

  if (firstColumnsQuantity !== secondMatrix.length) return undefined;

  const result: number[][] = new Array(firstRowsQuantity);
  for (let i = 0; i < firstRowsQuantity; i++) {
    result[i] = new Array(secondColumnsQuantity).fill(0);
  }

  for (let i = 0; i < firstRowsQuantity; i++) {
    for (let j = 0; j < secondColumnsQuantity; j++) {
      for (let k = 0; k < firstColumnsQuantity; k++) {
        result[i][j] += firstMatrix[i][k] * secondMatrix[k][j];
      }
    }
  }

  return result;
};
