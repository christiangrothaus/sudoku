export type SodokuCell = {
  number: Number
  pencil: ArrayLike<Number>,
};

export type SodokuBoard = SodokuCell[][];