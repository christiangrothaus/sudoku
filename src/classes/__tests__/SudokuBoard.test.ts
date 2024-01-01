import SudokuBoard from '../SudokuBoard';

describe('SudokuBoard', () => {
  describe('when creating a new instances', () => {
    it('should populate the grid', () => {
      const board = new SudokuBoard();

      board.forEachCell((cell) => {
        expect(cell).not.toBe(0);
      });
    });
  });
});