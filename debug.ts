import { Difficulty } from './src/models/difficulties';
import { createSudokuBoard, printBoard } from './src/utilities/sudokuBoard';

const board = createSudokuBoard(Difficulty.Easy);
printBoard(board, 'answer');