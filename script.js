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
      for (let j = 0; j < board[i].length; j++) {
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

const playerFactory = (name, marker) => {
  return {
    playerName: name,
    playerMarker: marker,
    checkPlayer() {
      console.log(this.playerName, this.playerMarker);
    },
  };
};

const gameController = (() => {
  const player1 = playerFactory("Ivan", "X");
  const player2 = playerFactory("Ana", "O");

  let currentPlayer = player1;

  const switchPlayers = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else if (currentPlayer === player2) {
      currentPlayer = player1;
    }
  };

  ///////////////////////////

  const checkWinner = () => {
    let firstElement = currentPlayer.playerMarker;

    const checkerR = row => {
      return Gameboard.returnBoard()[row].every(
        element => element === firstElement
      );
    };

    const checkerC = column => {
      if (firstElement === "") return false;

      let columnMatch = true;
      for (let i = 0; i < Gameboard.returnBoard().length; i++) {
        if (Gameboard.returnBoard()[i][column] !== firstElement) {
          columnMatch = false;
        }
      }

      if (columnMatch) {
        console.log(`${currentPlayer.playerName} is winner`);
      }
    };

    const checkerD = () => {
      if (firstElement === "") return false;

      let firstDiagonal = true;
      let secondDiagonal = true;

      for (let i = 0; i < Gameboard.returnBoard().length; i++) {
        if (Gameboard.returnBoard()[i][i] !== firstElement) {
          firstDiagonal = false;
        }
      }

      for (let i = 0; i < Gameboard.returnBoard().length; i++) {
        if (
          Gameboard.returnBoard()[i][Gameboard.returnBoard().length - 1 - i] !==
          firstElement
        ) {
          secondDiagonal = false;
        }
      }

      if (firstDiagonal || secondDiagonal) {
        console.log(`${currentPlayer.playerName} is winner`);
      }
    };

    for (let i = 0; i < Gameboard.returnBoard().length; i++) {
      if (checkerR(i) === true) {
        console.log(`${currentPlayer.playerName} is winner`);
      }
      checkerC(i);
    }

    checkerD();
  };

  //////////////////////////////

  const handleMove = (row, column) => {
    if (Gameboard.returnBoard()[row][column] === "") {
      Gameboard.returnBoard()[row][column] = currentPlayer.playerMarker;
    } else {
      console.log("Cell already occupied");
    }

    console.table(Gameboard.returnBoard());

    checkWinner();

    // switchPlayers();
  };

  return {
    handleMove,
    switchPlayers,
  };
})();

gameController.handleMove(0, 0);
gameController.handleMove(1, 1);
gameController.handleMove(2, 2);
