const domElements = (() => {
  const mainContainer = document.querySelector('.main-container');
  const formSection = document.querySelector('.form-section');
  const grid = document.querySelector('.grid');
  const info = document.querySelector('.info');
  const resetButton = document.querySelector('.reset-button > img');
  const submitButton = document.querySelector('button');
  return {mainContainer, formSection,
            grid, info,
            resetButton, submitButton}
})();

let playerList;
// may come back and add computer opponent later

const player = (name, marker) => {
  return {name, marker};
}

domElements.submitButton.addEventListener('click', () => {
  domElements.mainContainer.style.display = 'flex';
  domElements.formSection.style.display = 'none';
  const Name1 = document.querySelector('#player1-name').value;
  const Name2 = document.querySelector('#player2-name').value;
  const playerName1 = Name1 ? Name1 : 'Player One';
  const playerName2 = Name2 ? Name2 : 'Player Two';
  const player1 = player(playerName1, 'x');
  const player2 = player(playerName2, 'o');
  playerList = [player1, player2];
  domElements.info.textContent = `${playerName1}'s turn (x)`
})

const gameflow = (() => {
  // index to let us know which player is
  // currently in turn
  let playerIndex = 1;
  const indexAlter = () => {
    playerIndex++;
    return playerIndex %= 2;
  }

  // array of winning positions
  const winningBoard = ['012', '345', '678',
                      '036', '147', '258',
                      '246', '048'];

  let gameStatus = true;
  let winner = '';

  // checking when one player wins
  const winCheck = () => {
    let currMarker = playerList[playerIndex].marker;
    let currString = Gameboard.boardString();
    for (let winCondition of winningBoard) {
      // checks if there are lines or diagonals
      // with the same markers
      if (currString[parseInt(winCondition[0])] ===
      currMarker &&
      currString[parseInt(winCondition[1])] ===
      currMarker &&
      currString[parseInt(winCondition[2])] ===
      currMarker) {
        gameStatus = false;
        winner = playerList[playerIndex];
      }

    // if board is filled and no win conditions are met
    // set to draw
    if (currString.replace(/\s/g,'').length === 9 &&
        gameStatus == true) {
      gameStatus = false;
    }
    }
  }

  const infoText = () => {
    nextPlayerIndex = (playerIndex + 1) % 2;
    nextPlayer = playerList[nextPlayerIndex];
    if (gameStatus === true) {
      domElements.info.textContent = `${nextPlayer.name}'s turn (${nextPlayer.marker})`;
      if (nextPlayerIndex == 0) {
        domElements.info.style['background-color'] = 'rgb(67, 199, 252)';
      } else {
        domElements.info.style['background-color'] = 'rgb(255, 98, 98)';
      }
    } else if (gameStatus === false) {
      if (winner !== '') {
        domElements.info.textContent = `${winner.name} has won!`;
      } else {
        domElements.info.textContent = `Draw!`;
      }
    }
  }

  const checkGameStatus = () => {
    return gameStatus;
  }

  const restartGame = () => {
    playerIndex = 1;
    gameStatus = true;
    winner = '';
    Gameboard.restartBoard();
    domElements.info.textContent = `${playerList[0].name}'s turn (x)`;
    domElements.info.style['background-color'] = 'rgb(67, 199, 252)';
  }

  return {indexAlter, winCheck,
          checkGameStatus, winner,
          infoText, restartGame};
})();

const Gameboard = (() => {
  let board = [' ', ' ', ' ',
                ' ', ' ', ' ',
                ' ', ' ', ' '];
  
  // takes an html element (preferably div)
  // and appends 9 blocks of div containing
  // the markers
  const display = (div) => {
    let boardIndex = 0;
    for (let marker of board) {
      let box = document.createElement('div');
      box.setAttribute('id', boardIndex++)
      box.textContent = marker;

      // to refine later
      // functionality for each of the square grids
      box.addEventListener('click', () => {
        if (gameflow.checkGameStatus() === true) {
          if (box.textContent === ' ') {
            let currMarker = playerList[gameflow.indexAlter()].marker;
            let index = box.getAttribute('id');
            board[index] = currMarker;
            box.textContent = currMarker;
            if (currMarker === 'x') {
              box.style['background-color'] = 'rgb(67, 199, 252)';
            } else {
              box.style['background-color'] = 'rgb(255, 98, 98)';
            }
          }
          gameflow.winCheck();
        }
        gameflow.infoText();
      })
      // -----------

      div.appendChild(box);
    }
  }

  // turns our array containing markers into a string
  // so we can check win conditions in winCheck defined
  // above
  const boardString = () => {
    return board.join('');
  }

  // clear board if we want to restart
  const restartBoard = () => {
    board = [' ', ' ', ' ',
              ' ', ' ', ' ',
              ' ', ' ', ' '];

    // clear the whole board
    // if we don't do this then after display(grid)
    // it'll add more boxes to our page which shifts
    // the whole grid upwards
    while (domElements.grid.firstChild) {
      domElements.grid.removeChild(domElements.grid.lastChild);
    }
    display(domElements.grid);
  }

  return {display, boardString, restartBoard};
})();



Gameboard.display(domElements.grid);

domElements.resetButton.addEventListener('click', gameflow.restartGame);
