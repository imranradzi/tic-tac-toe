const player = (name, marker) => {
  return {name, marker};
}

const player1 = player('player1', 'x');
const player2 = player('player2', 'o');
const playerList = [player1, player2];

const winningBoard = ['012', '345', '678',
                      '036', '147', '258',
                      '246', '048'];

const gameflow = (() => {
  // index to let us know which player is
  // currently in turn
  let playerIndex = 0;
  const indexAlter = () => {
    /*console.log(playerIndex);*/
    playerIndex++;
    return playerIndex %= 2;
  }

  // checking when one player wins
  const winCheck = () => {
    let gameStatus = true;
    let currMarker = playerList[playerIndex].marker;
    let currString = Gameboard.boardString();
    /* console.log('currMarker, currString are |' + currMarker + '| and |' + currString + '|'); */
    let iterIndex = 0;
    for (let winCondition of winningBoard) {
      /* console.log('iteration ' + iterIndex++ , winCondition); */
      // checks if there are lines or diagonals
      // with the same markers
      if (currString[parseInt(winCondition[0])] ===
      currMarker &&
      currString[parseInt(winCondition[1])] ===
      currMarker &&
      currString[parseInt(winCondition[2])] ===
      currMarker) {
        console.log('WON')
        gameStatus = false;
      }
    }
  }
  return {indexAlter, winCheck};
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
        if (box.textContent === ' ') {
          let currMarker = playerList[gameflow.indexAlter()].marker;
          let index = box.getAttribute('id');
          board[index] = currMarker;
          box.textContent = currMarker;
        } else {
          console.log('box has been filled');
        }
        gameflow.winCheck();
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
  return {display, boardString};
})();

const grid = document.querySelector('.grid');
Gameboard.display(grid);

