import { SodokuCellPosition, SodokuSectionPosition } from '../../types/sodoku';
import SodokuGame from '../SodokuGame';

describe('SodokuGame', () => {
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