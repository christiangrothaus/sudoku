export type SudokuCell = {
  number: number | null | undefined
  pencil: number[]
};

export type SudokuCellPosition = [number, number];

export type SudokuSectionPosition = [number, number];

export type SudokuBoard = SudokuCell[][];