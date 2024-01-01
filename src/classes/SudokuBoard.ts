import { CELL_VALUES } from '../constants/sudoku';
import { SudokuCellPosition } from '../types/sudoku';
import { shuffleArray } from '../utilities/sudoku';

export default class SudokuBoard {
  private grid = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ];
  private counter = 0;

  constructor(grid: number[][] = null) {
    if (grid) {
      this.grid = grid;
    } else {
      this.createBoard();
    }
  }

  // A function to check if the grid is full
  private static checkGrid(board: SudokuBoard, invalidValue = null) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cellValue = board.getCell([i, j]);
        if (cellValue === invalidValue) {
          return false;
        }
      }
    }

    // We have a complete grid!
    return true;
  }

  private static solveBoard(board: SudokuBoard) {
    let row: number;
    let col: number;
    for (let i = 0; i < 81; i++) {
      row = Math.floor(i / 9);
      col = i % 9;
      if (board.getCell([row, col]) === 0) {
        for (const value of CELL_VALUES) {
          // Check that this value has not already be used on this row
          if (!board.isNumberInRow(value, row)) {
            // Check that this value has not already be used on this column
            if (!board.isNumberInColumn(value, col)) {
              // Check that this value has not already be used on this 3x3 square
              if (!board.isNumberInSection(value, [row, col])) {
                board.setCell([row, col], value);
                if (SudokuBoard.checkGrid(board, 0)) {
                  board.counter++;
                  break;
                } else {
                  if (SudokuBoard.solveBoard(board)) {
                    return true;
                  }
                }
              }
            }
          }
        }
        break;
      }
    }
    board.setCell([row, col], 0);
  }

  // A backtracking/recursive function to check all possible combinations of numbers until a solution is found
  private static fillBoard(board: SudokuBoard, loop = 0): Boolean {
    const boardSize = 81;
    let row: number;
    let col: number;
    for (let i = 0; i < boardSize; i++) {
      row = Math.floor(i / 9);
      col = i % 9;

      const currentCellValue = board.getCell([row, col]);
      if (currentCellValue === null) {
        const numbers = shuffleArray(CELL_VALUES);

        for (const value of numbers) {
          const notInRow = !board.isNumberInRow(value, row);
          const notInColumn = !board.isNumberInColumn(value, col);
          const notInSection = !board.isNumberInSection(value, [row, col]);

          // Check that this value has not already be used on this row
          if (notInRow && notInColumn && notInSection) {
            board.setCell([row, col], value);

            if (SudokuBoard.checkGrid(board)) {
              return true;
            } else {
              if (SudokuBoard.fillBoard(board, loop++)) {
                return true;
              }
            }
          }
        }
        break;
      }
    }
    board.setCell([row, col], null);
  }

  private createBoard(attempts = 5) {
    SudokuBoard.fillBoard(this);
    this.counter = 1;
    while (attempts > 0) {
      //Select a random cell that is not already empty
      let row = Math.floor(Math.random() * 9);
      let col = Math.floor(Math.random() * 9);
      while (this.getCell([row, col]) === 0) {
        row = Math.floor(Math.random() * 9);
        col = Math.floor(Math.random() * 9);
      }
      // Remember its cell value in case we need to put it back
      const backup = this.getCell([row, col]);
      this.setCell([row, col], 0);

      const boardCopy = this.copy();

      // Count the number of solutions that this grid has (using a backtracking approach implemented in the solveGrid() function)
      this.counter = 0;
      SudokuBoard.solveBoard(boardCopy);
      // If the number of solution is different from 1 then we need to cancel the change by putting the value we took away back in the grid
      if (boardCopy.counter !== 1) {
        this.setCell([row, col], backup);
        // We could stop here, but we can also have another attempt with a different cell just to try to remove more numbers
        attempts -= 1;
      }
    }
  }

  public copy(): SudokuBoard {
    const clonedGrid = this.grid.map(row => row.slice());
    const board = new SudokuBoard(clonedGrid);
    return board;
  }

  public getGrid(): number[][] {
    return this.grid;
  }

  public showGrid(label?: string) {
    let output = '';

    if (label) {
      output += `${label}\n`;
    }

    this.grid.forEach((row, rIdx) => {
      const seperator = (idx) => (idx !== 0 && idx !== 8) && (idx + 1) % 3 === 0 ? '| ' : '';
      const cols = row.reduce((acc, curr, idx) => acc += `${curr} ${seperator(idx)}`, '').trimEnd();
      output += `${cols}\n`;

      if (rIdx !== 8 && (rIdx + 1) % 3 === 0) {
        output += '---------------------\n';
      }
    });

    console.log(output);
  }

  public getRow(rowIndex: number): number[] {
    return this.grid[rowIndex];
  }

  public getCell([row, col]: SudokuCellPosition): number {
    return this.grid[row][col];
  }

  public setCell(cellPosition: SudokuCellPosition, value: number) {
    this.grid[cellPosition[0]][cellPosition[1]] = value;
  }

  public isNumberInRow(number: number, rowIndex: number): Boolean {
    const row = this.grid[rowIndex];
    return !!row.find(value => value === number);
  }

  public isNumberInColumn(number: number, columnIndex: number): Boolean {
    let isNumberInCol = false;

    for (let i = 0; i < 9; i++) {
      if (this.grid[i][columnIndex] === number) {
        isNumberInCol = true;
      }
    }

    return isNumberInCol;
  }

  public isNumberInSection(number: number, cellPosition: SudokuCellPosition): Boolean {
    let isNumberInSec = false;

    const rowStart = Math.floor(cellPosition[0] / 3) * 3;
    const columnStart = Math.floor(cellPosition[1] / 3) * 3;

    for (let i = rowStart; i < rowStart + 3; i++) {
      for (let j = columnStart; j < columnStart + 3; j++) {
        if (number === this.grid[i][j]) {
          isNumberInSec = true;
        }
      }
    }

    return isNumberInSec;
  }

  public forEachCell(callback: Function) {
    for (let i = 0; i < 81; i++) {
      const rowIndex = i % 9;
      const columnIndex = Math.floor(i / 9);
      callback(this.grid[rowIndex][columnIndex], i);
    }
  }
}