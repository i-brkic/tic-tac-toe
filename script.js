const Gameboard = (function () {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i][j] = "";
    }
  }

  const checkBoardStatus = () => {
    console.table(board);
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j <= board[i].length; j++) {
        board[i][j] = "";
      }
    }
  };

  return {
    checkBoardStatus,
    resetBoard,
    returnBoard: () => board,
  };
})();

//
