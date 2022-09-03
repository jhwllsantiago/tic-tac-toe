import { displayArray, clearCell, animationFunc } from "./helper.js";
import { checkForPattern } from "./board.js";

const restart = document.querySelector("#restart");
export const back = document.querySelector("#back");
const next = document.querySelector("#next");
const restartIcon = document.querySelector(".fa-rotate");
const backIcon = document.querySelector(".fa-backward");
const nextIcon = document.querySelector(".fa-forward");

(() => {
  back.style.visibility = "hidden";
  next.style.visibility = "hidden";
})();

restart.addEventListener("click", () => {
  restartFunc();
});
back.addEventListener("click", () => {
  backFunc();
});
next.addEventListener("click", () => {
  nextFunc();
});

function restartFunc() {
  animationFunc(restartIcon, "rotate-animation");
  back.style.visibility = "hidden";
  next.style.visibility = "hidden";
  array = [[], [], []];
  history = [];
  move = 0;
  displayArray(array);
  message.textContent = playerX + "'s turn";
  clearCell();
}
function backFunc() {
  move--;
  animationFunc(backIcon, "left-animation");
  clearCell("highlighted");
  next.style.visibility = "visible";
  displayArray(history[move]);
  if (move <= 0) back.style.visibility = "hidden";
}
function nextFunc() {
  move++;
  animationFunc(nextIcon, "right-animation");
  back.style.visibility = "visible";
  displayArray(history[move]);
  if (move >= history.length - 1) {
    next.style.visibility = "hidden";
    checkForPattern();
    move++;
  }
}
