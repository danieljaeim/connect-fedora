/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 * 
 * counter that increments with each turn
 * whether or not the counter is even or odd will determine the color of piece
 * 
 * 
 */

var WIDTH = 7;
var HEIGHT = 6;
var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])


/********************************************************************************/


/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
function makeBoard() {
  let board = new Array(HEIGHT).fill(null);
  let row = new Array(WIDTH).fill(null);
  board.forEach((val, i) => {
    board[i] = row;
  });
	return board;
}


/********************************************************************************/


/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  let board = document.querySelector("#board");
  // assemble HTML for top row
  var top = document.createElement("tr");
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
  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  // append top row to board
  board.append(top);
  // assemble and append the rest of the rows
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
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
  // TODO: make a div and insert into correct table cell
}


/********************************************************************************/


/** endGame: announce game end */
function endGame(msg) {
  // TODO: pop up alert message
}


/********************************************************************************/


/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  console.log(evt.target);
  // get x from ID of clicked cell
  var x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  // if we try to click on a row that's completely full, nothing happens
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
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


/********************************************************************************/


  // TODO: read and understand this code. Add comments to help you.
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}


/********************************************************************************/


makeBoard();
makeHtmlBoard();
