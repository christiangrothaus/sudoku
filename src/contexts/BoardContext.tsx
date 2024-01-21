import { createContext } from 'react';
import { createUnsetSudokuBoard } from '../utilities/sudokuBoard';
import { SudokuBoard } from '../models/sudoku';

export const BoardContext = createContext<[SudokuBoard, Function]>([createUnsetSudokuBoard(), () => {}]);

export default BoardContext;