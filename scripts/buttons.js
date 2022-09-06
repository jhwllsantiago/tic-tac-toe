import { displayArray, clearCell, animationFunc } from "./helper.js";
import { checkForPattern } from "./board.js";

const restart = document.querySelector("#restart");
const restartIcon = document.querySelector(".fa-rotate");
export const undo = document.querySelector("#undo");
export const redo = document.querySelector("#redo");
const undoIcon = document.querySelector(".fa-rotate-left");
const redoIcon = document.querySelector(".fa-rotate-right");
export const replay = document.querySelector("#replay");
let interval;

const hideBtns = () => {
  replay.style.visibility = "hidden";
  undo.style.visibility = "hidden";
  redo.style.visibility = "hidden";
};
hideBtns();

restart.addEventListener("click", () => {
  animationFunc(restartIcon, "rotate-cw");
  restartFunc();
});
function restartFunc() {
  hideBtns();
  array = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  history = [
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  ];
  move = 0;
  message.textContent = playerX + "'s turn";
  clearCell(1, 1, 1);
}

replay.addEventListener("click", () => {
  undo.style.visibility = "hidden";
  redo.style.visibility = "hidden";
  move = 0;
  clearCell(1, 1, 1);
  for (const cell of cells) cell.style.pointerEvents = "none";
  message.textContent = playerX + "'s turn";
  interval = setInterval(replayFunc, 750);
});
function replayFunc() {
  if (move !== history.length - 1) {
    move++;
    displayArray(history[move]);
    refresh();
    if (move === history.length - 1) {
      checkForPattern();
      clearInterval(interval);
    }
  }
}

undo.addEventListener("click", () => {
  animationFunc(undoIcon, "rotate-ccw");
  undoFunc();
});
redo.addEventListener("click", () => {
  animationFunc(redoIcon, "rotate-cw");
  redoFunc();
});

function undoFunc() {
  redo.style.visibility = "visible";
  replay.style.visibility = "hidden";
  if (move !== 0) {
    move--;
    displayArray(history[move]);
    clearCell(1, 1, 0);
    refresh();
    if (move === 0) undo.style.visibility = "hidden";
  }
}
function redoFunc() {
  undo.style.visibility = "visible";
  replay.style.visibility = "hidden";
  if (move !== history.length - 1) {
    move++;
    displayArray(history[move]);
    clearCell(1, 1, 0);
    refresh();
    if (move === history.length - 1) {
      checkForPattern();
      redo.style.visibility = "hidden";
    }
  }
}

function refresh() {
  if (move % 2 === 0) message.textContent = playerX + "'s turn";
  else message.textContent = playerO + "'s turn";
  for (const cell of cells)
    if (cell.textContent !== "") {
      cell.classList.add("clicked");
      cell.style.pointerEvents = "none";
    }
}
