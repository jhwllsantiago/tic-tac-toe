import { displayArray } from "./helper.js";
import { undo, redo, replay } from "./buttons.js";

const patterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
//[cellOne, cellTwo, cellThree]

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", () => {
    if (!playerOne || !playerTwo) alert("Please enter player name.");
    else {
      cells[i].classList.add("clicked");
      cells[i].style.pointerEvents = "none";
      assignLetter(i);
    }
  });
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

function assignLetter(i) {
  undo.style.visibility = "visible";
  checkForUndo();
  move++;
  let col = i % 3;
  let row = (i - col) / 3;
  if (move % 2 === 1) {
    array[row][col] = "X";
    message.textContent = playerTwo + "'s turn";
  } else {
    array[row][col] = "O";
    message.textContent = playerOne + "'s turn";
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
    const cellOne = cells[pattern[0]];
    const cellTwo = cells[pattern[1]];
    const cellThree = cells[pattern[2]];
    if (
      cellOne.textContent !== "" &&
      cellOne.textContent === cellTwo.textContent &&
      cellOne.textContent === cellThree.textContent
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
  if (move % 2 === 1) message.textContent = `${playerOne} is the winner!`;
  else message.textContent = `${playerTwo} is the winner!`;

  for (const cell of cells) {
    cell.classList.add("clicked");
    cell.style.pointerEvents = "none";
  }
  replay.style.visibility = "visible";
}
