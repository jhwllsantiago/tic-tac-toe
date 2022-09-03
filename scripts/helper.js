export const displayArray = (array) => {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      document.querySelector("#cell" + row + col).textContent = array[row][col];
    }
  }
};

export const clearCell = (clear = "both") => {
  if (clear === "both" || clear === "clicked")
    for (const cell of cells) {
      cell.classList.remove("clicked");
      cell.style.pointerEvents = "all";
    }
  if (clear === "both" || clear === "highlighted")
    for (const cell of cells) cell.classList.remove("highlighted");
};

export const animationFunc = (icon, animation) => {
  icon.classList.remove(animation);
  window.requestAnimationFrame(() => {
    icon.classList.add(animation);
  });
};
