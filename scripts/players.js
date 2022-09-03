const divX = document.querySelector("#player-x");
const divO = document.querySelector("#player-o");
const inputX = document.querySelector("#player-x input");
const inputO = document.querySelector("#player-o input");
const message = document.querySelector("#message");

(() => {
  divO.style.display = "none";
  message.style.display = "none";
})();

inputX.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (inputX.value.trim()) {
      playerX = inputX.value.trim();
      inputX.value = "";
      divX.style.display = "none";
      divO.style.display = "block";
    } else alert("Please enter player name.");
  }
});
inputO.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (inputO.value === playerX)
      alert(`Hey ${playerX}, this is a two-player game.`);
    else if (inputO.value.trim()) {
      playerO = inputO.value.trim();
      inputO.value = "";
      divO.style.display = "none";
      message.style.display = "block";
      message.textContent = playerX + "'s turn";
    } else alert("Please enter player name.");
  }
});
