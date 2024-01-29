import { createContext } from 'react';
import { SudokuCellPosition } from '../models/sudoku';

type GameContextType = {
  selectedCell: SudokuCellPosition,
  setSelectedCell: (newCellPosition: SudokuCellPosition) => void
}

const GameContext = createContext<GameContextType>({ selectedCell: undefined, setSelectedCell: undefined });

export default GameContext;