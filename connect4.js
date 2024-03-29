/** Connect Four
 *  Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 *  column until a player gets four-in-a-row (horiz, vert, or diag) or until
 *  board fills (tie)
 */

const WIDTH = 7; // amount of values in each array
const HEIGHT = 6; // really just the number of arrays
let currPlayer = 1; // active player: 1 or 2 - red is 1, black is 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
let turnCounter = 0;


/********************************************************************************/


/** makeBoard: create in-JS board structure:
 *  generate a matrix of null values - this is the board at start of game
 */
function makeBoard() {
  board = new Array(HEIGHT).fill(null);
  board.forEach((val, i) => {
    board[i] = new Array(WIDTH).fill(null);
  });
	return board;
}


/********************************************************************************/


/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  let board = document.querySelector("#board");
  // assemble HTML for top row
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  // mouseover and mouseout for button UI functionality
  top.addEventListener("mouseover", function(e) {
    e.target.style.backgroundColor = "#fff";
  });
  top.addEventListener("mouseout", function(e) {
    e.target.style.backgroundColor = "#c1d9ff";
  });
  top.addEventListener("click", handleClick);
  // add data cells to top row
  // 0 1 2 3 4 5 6
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  // append top row to board
  board.append(top);
  // assemble and append the rest of the rows
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      cell.classList.add('cells');
      row.append(cell);
    }
    board.append(row);
  }
  // Board created!
}


/********************************************************************************/


/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
  // start from bottom row up, check each spot
  for (let i = board.length - 1; i >= 0; i--) {
    if (board[i][x] === null) { return i; }
  }
  // if column is full, return null
  return null;
}


/********************************************************************************/


/** placeInTable: update DOM to place piece into HTML board */
function placeInTable(y, x) {
  // finds appropriate element
  let targetCell = document.getElementById(`${y}-${x}`);
  targetCell.classList.add('cells');
  // create piece, add appropriate classes, append to target cell
  let piece = document.createElement("div");
  piece.classList.add("piece");
  piece.classList.add(`p${currPlayer}`);
  targetCell.appendChild(piece);
}


/********************************************************************************/


/** endGame: announce game end */
const endGame = alert;


/********************************************************************************/

// set appropriate matrix value
function fillSpot(y, x) {
  board[y][x] = currPlayer;
}


/********************************************************************************/

// change current player variable
function changePlayer() {
  currPlayer = currPlayer === 1 ? 2 : 1;
}


/********************************************************************************/


/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  // if we try to click on a row that's completely full, nothing happens
  if (y === null) {
    return;
  }
  // increment turn counter, check if board is full
  turnCounter++;
  if (turnCounter === WIDTH * HEIGHT) { endGame("Tie!") }
  // place piece in board and add to HTML table
  placeInTable(y, x);
  // change appropriate value in matrix from null to player number
  fillSpot(y, x);
  // change player on each turn
  // check for win
  
  if (checkForWin()) {
    if (currPlayer === 1) {
      setTimeout(function() {
        setTimeout(function() {
          resetGame(); 
        }, 20)
        endGame('The Red Fedoras Prevail! Blue Fedoras, prepare to enter my cringe compilation') 
      }, 200)
    } else {
      setTimeout(function() {
        setTimeout(function() {
          resetGame(); 
        }, 30)
        endGame('The Blue Fedoras Prevail! Red Fedoras, prepare to enter my cringe compilation') 
      }, 302)
    }
  } 
  changePlayer();
  //if (checkForWin) 
}



/********************************************************************************/


/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
        ([y, x]) =>
            y >= 0 &&
            y < HEIGHT &&
            x >= 0 &&
            x < WIDTH &&
            board[y][x] === currPlayer
    );
  }
  // using a nested loop to access every value in the matrix
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // increment x
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // increment y
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // increment x, increment y
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      // decrement x, increment y 
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      // pass every possible 4 piece combo to _win - if any return true, checkForWin returns true
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true; 
      }
    }
  }
}

function resetGame() {
  makeBoard(); 
  currPlayer = 1; 
  turnCounter = 0; 
  let cells = [...document.getElementsByClassName('cells')];
  cells.forEach((cell) => {
    if (cell.firstChild) {
      cell.removeChild(cell.firstChild);
    }
  });
}

/********************************************************************************/

function winningMoves(board) {

  let possibleY = []; 

  for (let i = 0; i < WIDTH; i++) {
    let curYMove = findSpotForCol(i);
    if (curYMove !== null) {
      possibleY.push(curYMove);
    }
  }
  
  let winningMoves = []; 
  for (let j = 0; j < possibleY.length ;j++) {
    let curMove = possibleY[j];
    let copyBoard = JSON.parse(JSON.stringify(board));
    if (checkForWin(curMove)) {

    }

    
  }

}

/********************************************************************************/


// make boards
makeBoard();
makeHtmlBoard();


