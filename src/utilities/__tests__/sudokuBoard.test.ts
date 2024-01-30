import { Difficulty } from '../../models/difficulties';
import { shuffleRow, createSudokuBoard, getIsCellRelevant, cellPositionToSectionPosition, BOARD_SIZE } from '../sudokuBoard';

describe('shuffleRow', () => {
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

  it('should have an answer on every cell', () => {
    let answerCount = 0;

    genericBoard.forEach((row) => {
      row.forEach((cell) => {
        if (cell.answer) {
          answerCount++;
        }
      });
    });

    expect(answerCount).toBe(BOARD_SIZE);
  });

  it('should have 9 of each number in the answer', () => {
    const numberCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
    const expectedNumberCounts = { 1: 9, 2: 9, 3: 9, 4: 9, 5: 9, 6: 9, 7: 9, 8: 9, 9: 9 };

    genericBoard.forEach((row) => {
      row.forEach((cell) => {
        if (cell.answer) {
          numberCounts[cell.answer]++;
        }
      });
    });

    expect(numberCounts).toEqual(expectedNumberCounts);
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

describe('getIsCellRelevant', () => {
  it('it should return true if the cell positions are in the same row', () => {
    const selectedCellPosition = { x: 0, y: 4 };
    const cellPosition = { x: 9, y: 4 };

    const isCellRelevant = getIsCellRelevant(selectedCellPosition, cellPosition);

    expect(isCellRelevant).toBe(true);
  });

  it('it should return true if the cell positions are in the same column', () => {
    const selectedCellPosition = { x: 1, y: 8 };
    const cellPosition = { x: 1, y: 1 };

    const isCellRelevant = getIsCellRelevant(selectedCellPosition, cellPosition);

    expect(isCellRelevant).toBe(true);
  });

  it('it should return true if the cell positions are in the same section', () => {
    const selectedCellPosition = { x: 2, y: 2 };
    const cellPosition = { x: 1, y: 1 };

    const isCellRelevant = getIsCellRelevant(selectedCellPosition, cellPosition);

    expect(isCellRelevant).toBe(true);
  });

  it('it should return false if the cell positions are not in the same section', () => {
    const selectedCellPosition = { x: 8, y: 8 };
    const cellPosition = { x: 1, y: 1 };

    const isCellRelevant = getIsCellRelevant(selectedCellPosition, cellPosition);

    expect(isCellRelevant).toBe(false);
  });
});

describe('cellPositionToSectionPosition', () => {
  it.each([
    [{ x: 1, y: 1 }, { x: 0, y: 0 }],
    [{ x: 3, y: 1 }, { x: 1, y: 0 }],
    [{ x: 8, y: 7 }, { x: 2, y: 2 }],
    [{ x: 5, y: 3 }, { x: 1, y: 1 }],
    [{ x: 8, y: 5 }, { x: 2, y: 1 }],
  ])('should correctly convert the cell position to the section position', (cellPosition, expectedSectionPosition) => {
    const sectionPostion = cellPositionToSectionPosition(cellPosition);

    expect(sectionPostion).toEqual(expectedSectionPosition);
  });
});