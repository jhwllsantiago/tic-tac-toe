const restart = document.querySelector("#restart");
const back = document.querySelector("#back");
const next = document.querySelector("#next");
const divX = document.querySelector("#player-x");
const divO = document.querySelector("#player-o");
const inputX = document.querySelector("#player-x input");
const inputO = document.querySelector("#player-o input");
const message = document.querySelector("#message");
const restartIcon = document.querySelector(".fa-rotate");
const backIcon = document.querySelector(".fa-backward");
const nextIcon = document.querySelector(".fa-forward");
const cells = document.querySelectorAll(".cell");

let array = [[], [], []];
let playerX;
let playerO;
let move = 0;
let history = [];

//#region players
inputX.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (inputX.value.trim()) {
      playerX = inputX.value;
      inputX.value = "";
      divX.classList.add("none");
      divO.classList.remove("none");
    } else alert("Please enter player name.");
  }
});
inputO.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (inputO.value === playerX)
      alert(`Hey ${playerX}, this is a two-player game.`);
    else if (inputO.value.trim()) {
      playerO = inputO.value;
      inputO.value = "";
      divO.classList.add("none");
      message.classList.remove("none");
      message.textContent = playerX + "'s turn";
    } else alert("Please enter player name.");
  }
});
//#endregion
//#region cell event listerners
for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 3; col++) {
    const cell = document.querySelector("#cell" + row + col);
    cell.addEventListener("click", () => {
      if (playerX === undefined || playerO === undefined)
        alert("Please enter player name.");
      else {
        cell.classList.add("clicked");
        clicked(row, col);
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
      if (!cell.classList.contains("clicked")) cell.textContent = "";
    });
  }
}
//#endregion
//#region cell functions
function clicked(row, col) {
  if (move % 2 === 0) {
    array[row][col] = "X";
    message.textContent = playerO + "'s turn";
  } else {
    array[row][col] = "O";
    message.textContent = playerX + "'s turn";
  }
  history[move] = JSON.parse(JSON.stringify(array)); //deep copy of array
  displayArray(array);
  checkWinner();
  move++;
}
function displayArray(array) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      document.querySelector("#cell" + row + col).textContent = array[row][col];
    }
  }
}
function checkWinner() {
  if (hasPattern(0, 0, 0, 1, 0, 2)) postGame();
  else if (hasPattern(1, 0, 1, 1, 1, 2)) postGame();
  else if (hasPattern(2, 0, 2, 1, 2, 2)) postGame();
  else if (hasPattern(0, 0, 1, 0, 2, 0)) postGame();
  else if (hasPattern(0, 1, 1, 1, 2, 1)) postGame();
  else if (hasPattern(0, 2, 1, 2, 2, 2)) postGame();
  else if (hasPattern(0, 0, 1, 1, 2, 2)) postGame();
  else if (hasPattern(0, 2, 1, 1, 2, 0)) postGame();
  else if (move >= 8) {
    message.textContent = "You are both winners.";
    back.classList.remove("hidden");
    move--;
  }
}
function hasPattern(row1, col1, row2, col2, row3, col3) {
  if (
    array[row1][col1] !== undefined &&
    array[row1][col1] === array[row2][col2] &&
    array[row1][col1] === array[row3][col3]
  ) {
    document.querySelector("#cell" + row1 + col1).classList.add("winning-cell");
    document.querySelector("#cell" + row2 + col2).classList.add("winning-cell");
    document.querySelector("#cell" + row3 + col3).classList.add("winning-cell");
    return true;
  } else false;
}
function postGame() {
  if (move % 2 === 0) message.textContent = `${playerX} is the winner!`;
  else message.textContent = `${playerO} is the winner!`;

  for (const cell of cells) cell.classList.add("clicked");
  back.classList.remove("hidden");
  move--;
}
//#endregion
//#region buttons
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
  back.classList.add("hidden");
  next.classList.add("hidden");
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
  clearCell("winning");
  next.classList.remove("hidden");
  displayArray(history[move]);
  if (move <= 0) back.classList.add("hidden");
}
function nextFunc() {
  move++;
  animationFunc(nextIcon, "right-animation");
  back.classList.remove("hidden");
  displayArray(history[move]);
  if (move >= history.length - 1) {
    next.classList.add("hidden");
    checkWinner();
    move++;
  }
}
//#endregion
//#region helper
function clearCell(clear = "both") {
  if (clear === "both" || clear === "clicked")
    for (const cell of cells) cell.classList.remove("clicked");
  if (clear === "both" || clear === "winning")
    for (const cell of cells) cell.classList.remove("winning-cell");
}

function animationFunc(icon, animation) {
  icon.classList.remove(animation);
  window.requestAnimationFrame(() => {
    icon.classList.add(animation);
  });
}
//#endregion
