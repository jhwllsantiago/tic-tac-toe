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

let array = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let playerX;
let playerO;
let move = 0;
let history = [];

//#region players
inputX.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (hasName(inputX)) {
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
    else if (hasName(inputO)) {
      playerO = inputO.value;
      inputO.value = "";
      divO.classList.add("none");
      message.classList.remove("none");
      message.textContent = playerX + "'s turn";
    } else alert("Please enter player name.");
  }
});
function hasName(input) {
  let value = input.value.trim();
  if (value.length > 0 && value !== " ") return true;
  else return false;
}
//#endregion
//#region cell event listerners
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    document.querySelector("#cell" + i + j).addEventListener("click", () => {
      if (playerX === undefined || playerO === undefined)
        alert("Please enter player name.");
      else clicked(i, j);
    });
    if (matchMedia("(hover: hover)").matches) {
      document
        .querySelector("#cell" + i + j)
        .addEventListener("mouseover", () => {
          let hoverText;
          if (move % 2 === 0) hoverText = "X";
          else hoverText = "O";
          document.querySelector("#cell" + i + j).textContent = hoverText;
        });
      document
        .querySelector("#cell" + i + j)
        .addEventListener("mouseout", () => {
          if (
            !document
              .querySelector("#cell" + i + j)
              .classList.contains("clicked")
          ) {
            document.querySelector("#cell" + i + j).textContent = "";
          }
        });
    }
  }
}
//#endregion
//#region cell functions
function clicked(row, column) {
  document.querySelector("#cell" + row + column).classList.add("clicked");
  if (move % 2 === 0) {
    array[row][column] = "X";
    message.textContent = playerO + "'s turn";
  } else {
    array[row][column] = "O";
    message.textContent = playerX + "'s turn";
  }
  history[move] = JSON.parse(JSON.stringify(array)); //deep copy of array
  displayArray(array);
  checkWinner();
  move++;
  console.log("history length", move);
}
function displayArray(array) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      document.querySelector("#cell" + i + j).textContent = array[i][j];
    }
  }
}
function checkWinner() {
  if (hasPattern(0, 0, 0, 1, 0, 2)) declareWinner(0, 0, 0, 1, 0, 2);
  else if (hasPattern(1, 0, 1, 1, 1, 2)) declareWinner(1, 0, 1, 1, 1, 2);
  else if (hasPattern(2, 0, 2, 1, 2, 2)) declareWinner(2, 0, 2, 1, 2, 2);
  else if (hasPattern(0, 0, 1, 0, 2, 0)) declareWinner(0, 0, 1, 0, 2, 0);
  else if (hasPattern(0, 1, 1, 1, 2, 1)) declareWinner(0, 1, 1, 1, 2, 1);
  else if (hasPattern(0, 2, 1, 2, 2, 2)) declareWinner(0, 2, 1, 2, 2, 2);
  else if (hasPattern(0, 0, 1, 1, 2, 2)) declareWinner(0, 0, 1, 1, 2, 2);
  else if (hasPattern(0, 2, 1, 1, 2, 0)) declareWinner(0, 2, 1, 1, 2, 0);
  else if (move >= 8) {
    message.textContent = "You are both winners.";
    back.classList.remove("hidden");
    move--;
  }
}
function hasPattern(row1, column1, row2, column2, row3, column3) {
  if (
    array[row1][column1] !== "" &&
    array[row1][column1] === array[row2][column2] &&
    array[row1][column1] === array[row3][column3]
  )
    return true;
  else false;
}
function declareWinner(row1, column1, row2, column2, row3, column3) {
  document
    .querySelector("#cell" + row1 + column1)
    .classList.add("winning-cell");
  document
    .querySelector("#cell" + row2 + column2)
    .classList.add("winning-cell");
  document
    .querySelector("#cell" + row3 + column3)
    .classList.add("winning-cell");

  if (move % 2 === 0) message.textContent = `${playerX} is the winner!`;
  else message.textContent = `${playerO} is the winner!`;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      document.querySelector("#cell" + i + j).classList.add("clicked");
    }
  }
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
  array = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
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
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (clear === "both" || clear === "clicked")
        document.querySelector("#cell" + i + j).classList.remove("clicked");
      if (clear === "both" || clear === "winning")
        document
          .querySelector("#cell" + i + j)
          .classList.remove("winning-cell");
    }
  }
}
function animationFunc(icon, animation) {
  icon.classList.remove(animation);
  window.requestAnimationFrame(() => {
    icon.classList.add(animation);
  });
}
//#endregion
