import { createContext } from 'react';
import { SudokuCellPosition } from '../types/sudoku';

type GameContextType = {
  selectedCell: SudokuCellPosition | null,
  setSelectedCell: Function | undefined
}

const GameContext = createContext<GameContextType>({ selectedCell: undefined, setSelectedCell: undefined });

export default GameContext;