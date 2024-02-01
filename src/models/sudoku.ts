export type SudokuCell = {
  number: number | null | undefined
  pencil: number[],
  answer: number | null | undefined,
  isGenerated: boolean
};

export type SudokuCellPosition = {
  x: number,
  y: number
};

export type SudokuSectionPosition = {
  x: number,
  y: number
};

export type SudokuBoard = SudokuCell[][];