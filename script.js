let Gameboard = (() => {
  let board = ['x', '', 'x',
                    'x', '', '',
                    '', 'x', ''];
  
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
          box.textContent = currentPlayerMarker;
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
currentPlayerMarker = 'o';
