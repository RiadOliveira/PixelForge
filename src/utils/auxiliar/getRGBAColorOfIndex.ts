import { RGBAKey } from 'types/RGBAIndexes';

export const getRGBAColorOfIndex = (index: number): RGBAKey => {
  const parsedIndex = index % 4;

  switch (parsedIndex) {
    case 0:
      return 'RED';
    case 1:
      return 'GREEN';
    case 2:
      return 'BLUE';
    case 3:
      return 'ALPHA';
    default:
      return 'ALPHA';
  }
};
