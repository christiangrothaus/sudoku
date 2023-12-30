import { Difficulty } from '../../types/difficulties';
import { SodokuCellPosition, SodokuSectionPosition } from '../../types/sudoku';
import SodokuGame from '../SudokuGame';

describe('SodokuGame', () => {
  describe('createGame', () => {
    it('should create a SodokuBoard when instantiated', () => {
      const game = new SodokuGame(Difficulty.Easy, false);
      const board = game.getBoard();

      board.forEach((row) => {
        row.forEach((cell) => {
          expect(cell).toHaveProperty('number');
          expect(cell).toHaveProperty('pencil');
        });
      });
    });
  });

  describe('cellPositionToSectionPosition', () => {
    it.each([
      [[0, 0], [0, 0]],
      [[8, 8], [2, 2]],
      [[0, 8], [0, 2]],
      [[8, 0], [2, 0]],
      [[5, 7], [1, 2]]
    ])('should return the correct section position for the given cell position', (cellPosition: SodokuCellPosition, expectedSectionPosition: SodokuSectionPosition) => {
      const actual = SodokuGame.cellPositionToSectionPosition(cellPosition);

      expect(actual).toEqual(expectedSectionPosition);
    });
  });
});