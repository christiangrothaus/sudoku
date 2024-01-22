import { Difficulty } from '../../models/difficulties';
import { shuffleRow, createSudokuBoard } from '../sudokuBoard';

describe('shuffleArray', () => {
  it('should return an array with the same number of elements', () => {
    const oldArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const newArray = shuffleRow(oldArray);

    expect(oldArray.length).toBe(newArray.length);
  });
});

describe('createSudokuBoard', () => {
  const genericBoard = createSudokuBoard(Difficulty.Easy);
  it('should return a sudoku board that has some values', () => {
    let valueCount = 0;

    genericBoard.forEach((row) => {
      row.forEach((cell) => {
        if (typeof cell.number === 'number') {
          valueCount++;
        }
      });
    });

    expect(valueCount).not.toBe(0);
  });

  it('should have 9 rows', () => {
    expect(genericBoard.length).toBe(9);
  });

  it('should have 9 columns', () => {
    genericBoard.forEach((row) => {
      expect(row.length).toBe(9);
    });
  });
});