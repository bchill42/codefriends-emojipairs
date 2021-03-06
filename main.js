function selectedSquare() {
  if (!clickDisable) {
    clickDisable = true;
    totalClicks++;
    let toggle = false;
    let item = this.getElementsByClassName("squareBack")[0];
    console.log(item);
    if (count === 0) {
      clickDisable = false;
      picked.push(this);
      pickedBack.push(item);
      this.classList.add("is-flipped");
      this.removeEventListener("click", selectedSquare);
      count++;
    } else if (count === 1 && item.accessKey === pickedBack[0].accessKey) {
      document.getElementById("side-container").innerHTML = `Turns ${
        totalClicks / 2
      }`;
      this.classList.add("is-flipped");
      board = board.map((e) => {
        if (parseInt(item.accessKey) === e.value) {
          return {
            ...e,
            paired: true,
          };
        } else {
          return e;
        }
      });
      console.log(board);
      setTimeout(() => {
        clickDisable = false;
        this.classList.remove("is-flipped");
        this.classList.add("squarePaired");
        picked[0].classList.remove("is-flipped");
        picked[0].classList.add("squarePaired");
        this.removeEventListener("click", selectedSquare);
        picked[0].removeEventListener("click", selectedSquare);
        picked.pop();
        pickedBack.pop();
        squaresRemaining--;
        squaresRemaining--;
        if (squaresRemaining === 0) {
          console.log("GAME OVER");
          console.log(`${totalClicks / 2} turns taken`);
        }
      }, 1500);
      count = 0;
    } else if (count === 1 && item.accessKey !== pickedBack.accessKey) {
      document.getElementById("side-container").innerHTML = `Turns ${
        totalClicks / 2
      }`;
      this.classList.add("is-flipped");
      setTimeout(() => {
        this.classList.remove("is-flipped");
        picked[0].classList.remove("is-flipped");
        clickDisable = false;
        picked[0].addEventListener("click", selectedSquare);
        picked.pop();
        pickedBack.pop();
      }, 1500);
      count = 0;
    }
  }
}

function createBoardArray() {
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
  let squareContainer = document.getElementsByClassName("square");
  console.log(board);
  for (let i = 0; i < boardItems; i++) {
    board[i] = {
      id: i,
      value: mixedUpNumArray[i],
      emoji: emojiArray[mixedUpNumArray[i]],
      paired: false,
      player: null,
    };
    let clone = squareContainer[0].cloneNode(true);
    let cloneBack = clone.getElementsByClassName("squareBack")[0];
    cloneBack.innerHTML = `${board[i].emoji}`;
    cloneBack.accessKey = `${board[i].value}`;
    clone.addEventListener("click", selectedSquare);
    document.getElementById("main").appendChild(clone);
  }
  squareContainer[0].remove();
}

function boardSettings() {
  let boardSize = document.getElementById("boardSize");
  let numPlayers = document.getElementById("numPlayers");
  let loadBoard = document.getElementById("loadBoard");
  boardSize.addEventListener("click", setBoardSize);
  numPlayers.addEventListener("click", setNumPlayers);
  loadBoard.addEventListener("click", setLoadBoard);
}

function setBoardSize() {
  console.log("board size");
  getElementsByClassName("boardNum").style.visibilty = "visible";
}

function setNumPlayers() {
  console.log("number of players");
}

function setLoadBoard() {
  console.log("load board");
  //   document.getElementById("big-contanier").innerHTML = "";
  //   createBoardArray();
}

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

let board = [];
let clickDisable = false;
let picked = [];
let pickedBack = [];
let boardSize = 2;
let boardItems = Math.pow(boardSize, 2);
let totalClicks = 0;
let squaresRemaining = boardItems;
let count = 0;
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

boardSettings();
createBoardArray();
