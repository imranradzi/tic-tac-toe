const player = (name, marker) => {
  return {name, marker};
}

const player1 = player('player1', 'x');
const player2 = player('player2', 'o');
const playerList = [player1, player2];

const gameflow = (() => {
  // index to let us know which player is
  // currently in turn
  let playerIndex = 0;
  const indexAlter = () => {
    console.log(playerIndex);
    playerIndex++;
    return playerIndex %= 2;
  }
  return {indexAlter};
})();

const Gameboard = (() => {
  let board = ['', '', '',
                    '', '', '',
                    '', '', ''];
  
  // takes an html element (preferably div)
  // and appends 9 blocks of div containing
  // the markers
  const display = (div) => {
    for (const marker of board) {
      let box = document.createElement('div');
      box.textContent = marker;

      // to refine later
      box.addEventListener('click', () => {
        if (box.textContent === '') {
          box.textContent = playerList[gameflow.indexAlter()].marker;
        } else {
          console.log('box has been filled');
        }
      })
      // -----------

      div.appendChild(box);
    }
  }
  return {display};
})();

const grid = document.querySelector('.grid');
Gameboard.display(grid);

