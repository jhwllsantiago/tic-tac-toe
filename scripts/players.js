const divOne = document.querySelector("#player-one");
const divTwo = document.querySelector("#player-two");
const inputOne = document.querySelector("#player-one input");
const inputTwo = document.querySelector("#player-two input");
const message = document.querySelector("#message");

divTwo.style.display = "none";
message.style.display = "none";

inputOne.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    playerOne = inputOne.value.trim();
    if (playerOne) {
      localStorage.setItem("playerOne", playerOne);
      inputOne.value = "";
      divOne.style.display = "none";
      divTwo.style.display = "block";
    } else alert("Please enter player name.");
  }
});
inputTwo.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    playerTwo = inputTwo.value.trim();
    if (playerTwo === playerOne)
      alert(`Hey ${playerOne}, this is a two-player game.`);
    else if (playerTwo) {
      localStorage.setItem("playerTwo", playerTwo);
      inputTwo.value = "";
      divTwo.style.display = "none";
      message.style.display = "block";
      message.textContent = playerOne + "'s turn";
    } else alert("Please enter player name.");
  }
});
