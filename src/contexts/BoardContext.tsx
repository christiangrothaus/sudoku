import { createContext } from 'react';
import SudokuBoard from '../classes/SudokuBoard';

export const BoardContext = createContext<SudokuBoard>(new SudokuBoard());

export default BoardContext;