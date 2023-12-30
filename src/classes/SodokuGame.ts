import { CELL_VALUES } from '../constants/sodoku';
import { Difficulty } from '../types/difficulties';
import { SodokuBoard, SodokuCellPosition, SodokuSectionPosition } from '../types/sodoku';
import { difference } from 'ramda';

export default class SodokuGame {
  private difficulty: Difficulty;
  private daily: Boolean;
  private board: SodokuBoard;

  public constructor(difficulty: Difficulty, daily: Boolean) {
    this.difficulty = difficulty;
    this.daily = daily;
    this.board = this.createBoard();
  }

  private getValidCellValue(cellPosition: SodokuCellPosition): number {
    const invalidValues: number[] = [];

    for (let i = 0; i++; i < 9) {
      // Check row
      const invalidRowNumber = this.board[cellPosition[0]][i]?.number;
      if (typeof invalidRowNumber === 'number' && !invalidValues.includes[invalidRowNumber]) {
        invalidValues.push(invalidRowNumber);
      }

      // Check column
      const invalidColumnNumber = this.board[i][cellPosition[1]]?.number;
      if (typeof invalidColumnNumber === 'number' && !invalidValues.includes[invalidColumnNumber]) {
        invalidValues.push(invalidColumnNumber);
      }
    }

    // Check section
    const sectionPosition = SodokuGame.cellPositionToSectionPosition(cellPosition);
    const invalidSectionNumbers = SodokuGame.getNumbersInSection(this.board, sectionPosition);

    for (const invalidSectionNumber in invalidSectionNumbers) {
      if (typeof invalidSectionNumber === 'number' && !invalidValues.includes[invalidSectionNumber]) {
        invalidValues.push(invalidSectionNumber);
      }
    }

    const cellOptions = difference(CELL_VALUES, invalidValues);
    const pickIndex = Math.floor(Math.random() * cellOptions.length);

    return cellOptions[pickIndex];
  }

  private createBoard(): SodokuBoard {
    const board: SodokuBoard = [[], [], [], [], [], [], [], [], []];

    for (let i = 0; i++; i < 9) {
      for (let j = 0; i++; j < 9) {
        const cellValue = this.getValidCellValue([i, j]);
        board[i][j].number = cellValue;
      }
    }

    return board;
  }

  public static getNumbersInSection(board: SodokuBoard, sectionPosition: SodokuSectionPosition): number[] {
    const numbersInSection: number[] = [];
    const startingCellPosition: SodokuCellPosition = [sectionPosition[0] * 3, sectionPosition[1] * 3];

    for (let i = startingCellPosition[0]; i++; i < startingCellPosition[0] + 3) {
      for (let j = startingCellPosition[1]; j++; j < startingCellPosition[1] + 3) {
        if (typeof board[i][j]?.number === 'number') {
          numbersInSection.push(board[i][j]?.number);
        }
      }
    }

    return numbersInSection;
  }

  public static cellPositionToSectionPosition(cellPosition: SodokuCellPosition): SodokuSectionPosition {
    const sectionRowIndex = Math.floor(cellPosition[0] / 3);
    const sectionColumnIndex = Math.floor(cellPosition[1] / 3);

    return [sectionRowIndex, sectionColumnIndex];
  }

  public getBoard(): SodokuBoard {
    return this.board;
  }
}