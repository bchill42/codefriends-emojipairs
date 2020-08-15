const boardSize = 6;
const boardItems = Math.pow(boardSize, 2);
let board = [];
let disableClick = false;
let totalClicks = 0;
let squaresRemaining = boardItems;
let clickDisable = false;

let emojiArray = [
  "😅",
  "😄",
  "😇",
  "🤣",
  "🙃",
  "😍",
  "😘",
  "😜",
  "🤪",
  "🤩",
  "🤓",
  "😭",
  "😡",
  "😤",
  "🤯",
  "😳",
  "🤥",
  "🤔",
  "🤢",
  "🤮",
  "😈",
  "🤡",
  "💩",
  "👽",
  "🤖",
  "🙀",
  "😸",
  "👻",
  "💀",
  "😷",
];

const numberArray = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
];

let randomNumberArray = [];

for (let i = 0; i < boardItems / 2; i++) {
  let num = Math.floor(Math.random() * Math.floor(numberArray.length));
  if (!randomNumberArray.includes(num)) {
    randomNumberArray.push(num);
    randomNumberArray.push(num);
  } else {
    i--;
  }
}

let mixedUpNumArray = [];

for (let i = 0; i < boardItems; i++) {
  let num = Math.floor(Math.random() * Math.floor(randomNumberArray.length));
  mixedUpNumArray.push(randomNumberArray[num]);
  randomNumberArray.splice(num, 1);
}
let count = 0;
let picked = [];
let pickedInner = [];

function selectedSquare() {
  if (!clickDisable) {
    clickDisable = true;
    totalClicks++;
    let inner = this.getElementsByClassName("squareInside")[0];
    if (count === 0) {
      clickDisable = false;
      picked.push(this);
      inner.style.visibility = "visible";
      pickedInner.push(inner);
      count++;
      this.removeEventListener("click", selectedSquare);
    } else if (count === 1 && pickedInner[0].accessKey === inner.accessKey) {
      inner.style.visibility = "visible";
      document.getElementById("side-container").innerHTML = `Turns ${
        totalClicks / 2
      }`;
      setTimeout(() => {
        clickDisable = false;
        inner.style.visibility = "hidden";
        pickedInner[0].style.visibility = "hidden";
        this.style.backgroundColor = "#ea7575";
        picked[0].style.backgroundColor = "#ea7575";
        this.style.cursor = "none";
        picked[0].style.cursor = "none";
        this.removeEventListener("click", selectedSquare);
        picked[0].removeEventListener("click", selectedSquare);
        picked.pop();
        pickedInner.pop();
        squaresRemaining--;
        squaresRemaining--;
        if (squaresRemaining === 0) {
          console.log("GAME OVER");
          console.log(`${totalClicks / 2} turns taken`);
        }
      }, 1500);
      count = 0;
    } else if (count === 1 && pickedInner[0].accessKey !== inner.accessKey) {
      inner.style.visibility = "visible";
      document.getElementById("side-container").innerHTML = `Turns ${
        totalClicks / 2
      }`;
      setTimeout(() => {
        clickDisable = false;
        picked[0].addEventListener("click", selectedSquare);
        pickedInner[0].style.visibility = "hidden";
        inner.style.visibility = "hidden";
        picked.pop();
        pickedInner.pop();
      }, 1500);
      count = 0;
    }
  }
}

function createBoardArray() {
  let squareContainer = document.getElementsByClassName("square");
  for (let i = 0; i < boardItems; i++) {
    board[i] = {
      id: i,
      value: mixedUpNumArray[i],
      emoji: emojiArray[mixedUpNumArray[i]],
      paired: false,
    };
    let clone = squareContainer[0].cloneNode(true);
    let squareItem = clone.getElementsByClassName("squareInside");
    squareItem[0].innerHTML = `${board[i].emoji}`;
    squareItem[0].accessKey = `${board[i].value}`;
    clone.style.color = "#6a8be7";
    clone.addEventListener("click", selectedSquare);
    document.getElementById("main").appendChild(clone);
  }
  squareContainer[0].remove();
}
createBoardArray();
