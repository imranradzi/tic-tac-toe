let Gameboard = (() => {
  let gameBoard = ['x', 'o', 'x',
                    'x', 'o', 'o',
                    'o', 'x', 'o'];
  return {gameBoard};
})();

const grid = document.querySelector('.grid');
for (const marker of Gameboard.gameBoard) {
  let div = document.createElement('div');
  div.textContent = marker;
  grid.appendChild(div);
}
