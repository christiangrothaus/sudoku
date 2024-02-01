import { createContext } from 'react';
import { SudokuBoard, SudokuCellPosition } from '../models/sudoku';

type GameContextType = {
  selectedCell: SudokuCellPosition,
  setSelectedCell: (newCellPosition: SudokuCellPosition) => void,
  board: SudokuBoard,
  setBoard: (updatedBoard: SudokuBoard) => void;
}

const GameContext = createContext<GameContextType>({ selectedCell: { x: undefined, y: undefined }, setSelectedCell: undefined, board: [], setBoard: undefined });

export default GameContext;