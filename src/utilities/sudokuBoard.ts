import { clone, equals } from 'ramda';
import { CELL_VALUES } from '../constants/sudoku';
import { SudokuCellPosition, SudokuBoard, SudokuSectionPosition } from '../models/sudoku';
import { Difficulty } from '../models/difficulties';

export const EMPTY_VALUE: undefined = undefined;
export const UNSET_VALUE: null = null;
export const BOARD_SIZE = 81;

export const shuffleRow = (array: number[]) => {
  const arrayOptions = clone(array);
  const shuffledArray = [];

  // While there remain elements to shuffle.
  while (arrayOptions.length) {

    // Pick a remaining element.
    let randomIndex = Math.floor(Math.random() * arrayOptions.length);

    // And swap it with the current element.
    shuffledArray.push(arrayOptions[randomIndex]);
    arrayOptions.splice(randomIndex, 1);
  }

  return shuffledArray;
};

export const printBoard = (board: SudokuBoard, prop?: string, label?: string) => {
  let output = '';
  const property = prop || 'number';

  if (label) {
    output += `${label}\n`;
  }

  board.forEach((row, rIdx) => {
    const seperator = (idx) => (idx !== 0 && idx !== 8) && (idx + 1) % 3 === 0 ? '| ' : '';
    const displayValue = (val) => val === undefined ? '?' : val;
    const cols = row.reduce((acc, curr, idx) => acc += `${displayValue(curr[property])} ${seperator(idx)}`, '').trimEnd();
    output += `${cols}\n`;

    if (rIdx !== 8 && (rIdx + 1) % 3 === 0) {
      output += '---------------------\n';
    }
  });

  // eslint-disable-next-line no-console
  console.log(output);
};

const isNumberInColumn = (board: SudokuBoard) => (number: number, columnIndex: number): Boolean => {
  let isNumberInCol = false;

  for (let i = 0; i < 9; i++) {
    if (board[i][columnIndex].number === number) {
      isNumberInCol = true;
    }
  }

  return isNumberInCol;
};

export const cellPositionToSectionPosition = (cellPosition: SudokuCellPosition): SudokuSectionPosition => {
  const sectionPostion: SudokuSectionPosition = { x: undefined, y: undefined };

  sectionPostion.x = Math.floor(cellPosition.x / 3);
  sectionPostion.y = Math.floor(cellPosition.y / 3);

  return sectionPostion;
};

export const getIsCellRelevant = (selectedCell: SudokuCellPosition, cellPosition: SudokuCellPosition): boolean => {
  let isCellRelevant = false;

  if (selectedCell.x === cellPosition.x) {
    isCellRelevant = true;
  } else if (selectedCell.y === cellPosition.y) {
    isCellRelevant = true;
  } else if (equals(cellPositionToSectionPosition(selectedCell), cellPositionToSectionPosition(cellPosition))) {
    isCellRelevant = true;
  }

  return isCellRelevant;
};

const isNumberInRow = (board: SudokuBoard) => (number: number, rowIndex: number): Boolean => {
  const row = board[rowIndex];
  return !!row.find(cell => cell.number === number);
};

const isNumberInSection = (board: SudokuBoard) => (number: number, cellPosition: SudokuCellPosition): Boolean => {
  let isNumberInSec = false;

  const rowStart = Math.floor(cellPosition.y / 3) * 3;
  const columnStart = Math.floor(cellPosition.x / 3) * 3;

  for (let i = rowStart; i < rowStart + 3; i++) {
    for (let j = columnStart; j < columnStart + 3; j++) {
      if (board[i][j].number === number) {
        isNumberInSec = true;
      }
    }
  }

  return isNumberInSec;
};

const checkSudokuBoard = (board: SudokuBoard) => (invalidValue: null | undefined) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cellValue = board[i][j].number;
      if (cellValue === invalidValue) {
        return false;
      }
    }
  }

  // We have a complete grid!
  return true;
};

const solveSudokuBoard = (board: SudokuBoard, counter: {count: number}): Boolean | undefined => {
  let row: number;
  let col: number;
  for (let i = 0; i < BOARD_SIZE; i++) {
    row = Math.floor(i / 9);
    col = i % 9;
    if (board[row][col].number === EMPTY_VALUE) {
      for (const value of CELL_VALUES) {
        // Check that this value has not already be used on this row
        if (!isNumberInRow(board)(value, row)) {
          // Check that this value has not already be used on this column
          if (!isNumberInColumn(board)(value, col)) {
            // Check that this value has not already be used on this 3x3 square
            if (!isNumberInSection(board)(value, { x: col, y: row })) {
              board[row][col].number = value;

              if (checkSudokuBoard(board)(EMPTY_VALUE)) {
                counter.count++;
                break;
              } else {
                if (solveSudokuBoard(board, counter)) {
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
  board[row][col].number = EMPTY_VALUE;
};

const fillSudokuBoard = (board: SudokuBoard, loop = 0): SudokuBoard | undefined => {
  let row: number;
  let col: number;
  for (let i = 0; i < BOARD_SIZE; i++) {
    row = Math.floor(i / 9);
    col = i % 9;

    const currentCellNumber = board[row][col].number;
    if (currentCellNumber === UNSET_VALUE) {
      const numbers = shuffleRow(CELL_VALUES);

      for (const value of numbers) {
        const notInRow = !isNumberInRow(board)(value, row);
        const notInColumn = !isNumberInColumn(board)(value, col);
        const notInSection = !isNumberInSection(board)(value, { y: row, x: col });

        // Check that this value has not already be used on this row
        if (notInRow && notInColumn && notInSection) {
          board[row][col].number = value;
          board[row][col].answer = value;

          if (checkSudokuBoard(board)(UNSET_VALUE)) {
            return board;
          } else {
            if (fillSudokuBoard(board, loop++)) {
              return board;
            }
          }
        }
      }
      break;
    }
  }
  board[row][col].number = UNSET_VALUE;
};

export const createUnsetSudokuBoard = (): SudokuBoard => {
  const unsetBoard: SudokuBoard = [];

  for (let i = 0; i < 9; i++) {
    unsetBoard.push([]);
    for (let j = 0; j < 9; j++) {
      unsetBoard[i].push({ number: UNSET_VALUE, pencil: [], answer: EMPTY_VALUE, isGenerated: true });
    }
  }

  return unsetBoard;
};

// Adapted from https://www.101computing.net/sudoku-generator-algorithm/
export const createSudokuBoard = (difficulty: Difficulty) => {
  const unsetBoard = createUnsetSudokuBoard();
  const difficultyAttempts = {
    [Difficulty.Easy]: 1,
    [Difficulty.Medium]: 3,
    [Difficulty.Hard]: 5
  };

  let attempts = difficultyAttempts[difficulty];

  const filledBoard = fillSudokuBoard(unsetBoard);
  while (attempts > 0) {
    //Select a random cell that is not already empty
    let row = Math.floor(Math.random() * 9);
    let col = Math.floor(Math.random() * 9);
    while (filledBoard[row][col] === EMPTY_VALUE) {
      row = Math.floor(Math.random() * 9);
      col = Math.floor(Math.random() * 9);
    }
    // Remember its cell value in case we need to put it back
    const backupValue = clone(filledBoard[row][col]);
    console.log(filledBoard[row][col]);
    filledBoard[row][col].number = EMPTY_VALUE;
    filledBoard[row][col].isGenerated = false;

    const boardCopy = clone(filledBoard);

    // Count the number of solutions that this grid has (using a backtracking approach implemented in the solveGrid() function)
    const counter = { count: 0 };
    solveSudokuBoard(boardCopy, counter);
    // If the number of solution is different from 1 then we need to cancel the change by putting the value we took away back in the grid
    if (counter.count !== 1) {
      filledBoard[row][col] = backupValue;
      // We could stop here, but we can also have another attempt with a different cell just to try to remove more numbers
      attempts -= 1;
    }
  }

  return filledBoard;
};

export const checkIfBoardIsSolved = (board: SudokuBoard): boolean => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j].number !== board[i][j].answer) {
        return false;
      }
    }
  }

  return true;
};