import { displayArray } from "./helper.js";
import { undo, redo, replay } from "./buttons.js";

const patterns = [
  [0, 0, 0, 1, 0, 2],
  [1, 0, 1, 1, 1, 2],
  [2, 0, 2, 1, 2, 2],
  [0, 0, 1, 0, 2, 0],
  [0, 1, 1, 1, 2, 1],
  [0, 2, 1, 2, 2, 2],
  [0, 0, 1, 1, 2, 2],
  [0, 2, 1, 1, 2, 0],
];
//[row1, col1, row2, col2, row3, col3]

for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 3; col++) {
    const cell = document.querySelector("#cell" + row + col);
    cell.addEventListener("click", () => {
      if (!playerX || !playerO) alert("Please enter player name.");
      else {
        cell.classList.add("clicked");
        cell.style.pointerEvents = "none";
        assignLetter(row, col);
      }
    });
  }
}
if (matchMedia("(hover: hover)").matches) {
  for (const cell of cells) {
    cell.addEventListener("mouseover", () => {
      if (move % 2 === 0) cell.textContent = "X";
      else cell.textContent = "O";
    });
    cell.addEventListener("mouseout", () => {
      if (cell.style.pointerEvents !== "none") cell.textContent = "";
    });
  }
}

function assignLetter(row, col) {
  undo.style.visibility = "visible";
  checkForUndo();
  move++;
  if (move % 2 === 1) {
    array[row][col] = "X";
    message.textContent = playerO + "'s turn";
  } else {
    array[row][col] = "O";
    message.textContent = playerX + "'s turn";
  }
  history[move] = JSON.parse(JSON.stringify(array)); //deep copy of array
  displayArray(array);
  checkForPattern();
}

function checkForUndo() {
  if (move !== history.length - 1) {
    while (history.length - 1 !== move) history.pop();
    redo.style.visibility = "hidden";
    array = JSON.parse(JSON.stringify(history[move]));
  }
}

export function checkForPattern() {
  for (const pattern of patterns) {
    const cellOne = document.querySelector("#cell" + pattern[0] + pattern[1]);
    const cellTwo = document.querySelector("#cell" + pattern[2] + pattern[3]);
    const cellThree = document.querySelector("#cell" + pattern[4] + pattern[5]);

    if (
      array[pattern[0]][pattern[1]] !== "" &&
      array[pattern[0]][pattern[1]] === array[pattern[2]][pattern[3]] &&
      array[pattern[0]][pattern[1]] === array[pattern[4]][pattern[5]]
    ) {
      cellOne.classList.add("highlighted");
      cellTwo.classList.add("highlighted");
      cellThree.classList.add("highlighted");
      winner();
      return;
    }
  }
  if (move >= 9) {
    message.textContent = "You are both winners.";
    replay.style.visibility = "visible";
  }
}
function winner() {
  if (move % 2 === 1) message.textContent = `${playerX} is the winner!`;
  else message.textContent = `${playerO} is the winner!`;

  for (const cell of cells) {
    cell.classList.add("clicked");
    cell.style.pointerEvents = "none";
  }
  replay.style.visibility = "visible";
}
