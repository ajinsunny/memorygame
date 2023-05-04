const grid = document.getElementById("grid");
const slider = document.getElementById("slider");
const winMessage = document.getElementById("winMessage");
const lossMessage = document.getElementById("lossMessage");

let cells = [];
let highlightedCells = new Set();
let clickedCells = new Set();
let incorrectClicks = 0;

// Create cells based on the slider value
function createCells(value) {
  cells = [];
  for (let i = 0; i < value * value; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.onclick = () => {
      if (highlightedCells.has(i)) {
        cell.classList.add("highlighted");
        clickedCells.add(i);
        if (clickedCells.size === highlightedCells.size) {
          winMessage.style.display = "block"; // Display the win message
        }
      } else {
        incorrectClicks++;
        cell.classList.add("incorrect"); // Add the incorrect class
        if (incorrectClicks === highlightedCells.size) {
          lossMessage.style.display = "block"; // Display the loss message
        }
      }
    };
    cells.push(cell);
    grid.appendChild(cell);
  }
}

slider.oninput = function () {
  const value = this.value;

  grid.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${value}, 1fr)`;

  // Clear the grid
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  createCells(value);
};

function startGame() {
  winMessage.style.display = "none"; // Hide the win message when the game starts
  lossMessage.style.display = "none"; // Hide the loss message when the game starts
  incorrectClicks = 0;
  highlightedCells.clear();
  clickedCells.clear();
  cells.forEach((cell) => {
    cell.classList.remove("highlighted");
    cell.classList.remove("incorrect"); // Remove the incorrect class
  });

  while (highlightedCells.size < 4) {
    const randomIndex = Math.floor(Math.random() * cells.length);
    highlightedCells.add(randomIndex);
  }

  highlightedCells.forEach((index) => {
    cells[index].classList.add("highlighted");
  });

  setTimeout(() => {
    highlightedCells.forEach((index) => {
      cells[index].classList.remove("highlighted");
    });
  }, 3000);
}

createCells(slider.value); // Create initial cells based on the default slider value
