export type SodokuCell = {
  number: number | null
  pencil: number[],
};

export type SodokuCellPosition = [number, number];

export type SodokuSectionPosition = [number, number];

export type SodokuBoard = SodokuCell[][];