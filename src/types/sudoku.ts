export type SudokuCell = {
  number: number | null
  pencil: number[],
};

export type SudokuCellPosition = [number, number];

export type SudokuSectionPosition = [number, number];

export type SudokuBoard = SudokuCell[][];