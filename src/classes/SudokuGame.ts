import { CELL_VALUES } from '../constants/sudoku';
import { Difficulty } from '../types/difficulties';
import { SudokuBoard, SudokuCellPosition, SudokuSectionPosition } from '../types/sudoku';
import { difference } from 'ramda';

export default class SudokuGame {
  private difficulty: Difficulty;
  private daily: Boolean;
  private board: SudokuBoard;

  public constructor(difficulty: Difficulty, daily: Boolean) {
    this.difficulty = difficulty;
    this.daily = daily;
    this.board = this.createBoard();
  }

  private getValidCellValue(board: SudokuBoard, cellPosition: SudokuCellPosition): number {
    const invalidValues: number[] = [];

    for (let i = 0; i < 9; i++) {
      // Check row
      const invalidRowNumber = board[cellPosition[0]][i]?.number;
      if (typeof invalidRowNumber === 'number' && !invalidValues.includes[invalidRowNumber]) {
        invalidValues.push(invalidRowNumber);
      }

      // Check column
      const invalidColumnNumber = board[i][cellPosition[1]]?.number;
      if (typeof invalidColumnNumber === 'number' && !invalidValues.includes[invalidColumnNumber]) {
        invalidValues.push(invalidColumnNumber);
      }
    }

    // Check section
    const sectionPosition = SudokuGame.cellPositionToSectionPosition(cellPosition);
    const invalidSectionNumbers = SudokuGame.getNumbersInSection(board, sectionPosition);

    invalidSectionNumbers.forEach((invalidSectionNumber) => {
      if (typeof invalidSectionNumber === 'number' && !invalidValues.includes[invalidSectionNumber]) {
        invalidValues.push(invalidSectionNumber);
      }
    });

    const cellOptions = difference(CELL_VALUES, invalidValues);
    const pickIndex = Math.floor(Math.random() * cellOptions.length);

    return cellOptions[pickIndex];
  }

  private createBoard(): SudokuBoard {
    const board: SudokuBoard = [[], [], [], [], [], [], [], [], []];

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cellValue = this.getValidCellValue(board, [i, j]);
        board[i][j] = { number: cellValue, pencil: null };
      }
    }

    return board;
  }

  public static getNumbersInSection(board: SudokuBoard, sectionPosition: SudokuSectionPosition): number[] {
    const numbersInSection: number[] = [];
    const startingCellPosition: SudokuCellPosition = [sectionPosition[0] * 3, sectionPosition[1] * 3];

    for (let i = startingCellPosition[0]; i < startingCellPosition[0] + 3; i++) {
      for (let j = startingCellPosition[1]; j < startingCellPosition[1] + 3; j++) {
        if (typeof board[i][j]?.number === 'number') {
          numbersInSection.push(board[i][j]?.number);
        }
      }
    }

    return numbersInSection;
  }

  public static cellPositionToSectionPosition(cellPosition: SudokuCellPosition): SudokuSectionPosition {
    const sectionRowIndex = Math.floor(cellPosition[0] / 3);
    const sectionColumnIndex = Math.floor(cellPosition[1] / 3);

    return [sectionRowIndex, sectionColumnIndex];
  }

  public getBoard(): SudokuBoard {
    return this.board;
  }
}