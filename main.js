/*----- constants -----*/
const COLOR_LOOKUP = {
    '1': 'yellow',
    '-1': 'green',
    'null': 'white'
  };
  
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  //Declare variabels
  let board;
  let turn;
  let winner;
  
  //cached elements
  const message = document.querySelector('h1');
  const playAgainBtn = document.querySelector('button');
  
  
  //build event listeners
  document.getElementById('board').addEventListener('click', handleMove);
  playAgainBtn.addEventListener('click', initialize);
  

  initialize();
  
  // Initialize all state variables, invoke function with render()
  function initialize() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = null;
    render();
  }
  
  // Update recent move, then call render()
  function handleMove(event) {
    // obtain index of square
    const idx = parseInt(event.target.id.replace('sq-', ''));
    
    if (
      
      isNaN(idx) ||
      
      board[idx] ||
      // Game over
      winner
    ) return;
    // Update state (board, turn, winner)
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    // Show updated state
    render();
  }
  
  function getWinner() {
    for (let winArr of winningCombos) {
      if (Math.abs(board[winArr[0]] + board[winArr[1]] + board[winArr[2]]) === 3) return board[winArr[0]];
    }
    
    if (board.includes(null)) return null;
    return 'T';
  }
  
 
  function render() {
    renderBoard();
    renderMessage();
    
    playAgainBtn.disabled = !winner;
  }
  
  function renderBoard() {
    board.forEach(function(sqVal, idx) {
      const squareEl = document.getElementById(`sq-${idx}`);
      squareEl.style.backgroundColor = COLOR_LOOKUP[sqVal];
      squareEl.className = !sqVal ? 'avail' : '';
    });
  }
  
  function renderMessage() {
    if (winner === 'T') {
      message.innerHTML = 'It is a tie!';
    } else if (winner) {
      message.innerHTML = `Awesome <span style="color: ${COLOR_LOOKUP[winner]}">${COLOR_LOOKUP[winner].toUpperCase()}</span>!`;
    } else {
      message.innerHTML = `<span style="color: ${COLOR_LOOKUP[turn]}">${COLOR_LOOKUP[turn].toUpperCase()}</span>'s Turn`;
    }
}