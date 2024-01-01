import { shuffleArray } from '../sudoku';

describe('shuffleArray', () => {
  it('should return an array with the same number of elements', () => {
    const oldArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const newArray = shuffleArray(oldArray);

    expect(oldArray.length).toBe(newArray.length);
  });
});