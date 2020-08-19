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
  console.log(document.getElementsByClassName("square")[0]);
  document.getElementById("side-container").innerHTML = "Turns 0";
  totalClicks = 0;
  if (document.getElementsByClassName("square").length > 1) {
    let saveFirst = document.getElementsByClassName("square")[0];
    saveFirst.classList.remove("squarePaired");
    saveFirst.style.flex = "1 0 13%";
    // for (i = 0; i > document.getElementsByClassName("square").length; i++) {
    //   document.getElementsByClassName("square").innerHTML = "";
    // }
    document.getElementById("main").innerHTML = "";
    document.getElementById("main").appendChild(saveFirst);
  }
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
  if (boardItems === 16) {
    for (i = 0; i < 16; i++) {
      document.getElementsByClassName("square")[i].style.flex = "1 0 20%";
    }
  }
}

function boardSettings() {
  let boardSizeDiv = document.getElementById("boardSizeDiv");
  let numPlayers = document.getElementById("numPlayers");
  let loadBoard = document.getElementById("loadBoard");
  boardSizeDiv.accessKey = 6;
  console.log(`Initial Board Size Access Key ${boardSizeDiv.accessKey}`);
  boardSizeDiv.addEventListener("click", setBoardSize);
  numPlayers.addEventListener("click", setNumPlayers);
  loadBoard.addEventListener("click", setLoadBoard);
}

function changeBoardSize() {
  console.log(parseInt(this.innerHTML));
  boardSize = parseInt(this.innerHTML);
  document.getElementById("boardSizeDiv").accessKey = boardSize;
  board2.classList.add("selected");
  board4.classList.remove("selected");
  board6.classList.remove("selected");
  document.getElementsByClassName("boardNum")[0].style.display = "none";
  document.getElementsByClassName("boardNum")[1].style.display = "none";
  document.getElementsByClassName("boardNum")[2].style.display = "none";
  console.log(`accesskey = ${boardSize}`);
  document.getElementById("loadBoard").style.backgroundColor = "#23D028";
}

function setBoardSize() {
  //   let boardSizeDiv = document.getElementById("boardSizeDiv");
  //   boardSizeDiv.accessKey = 6;
  //   console.log(boardSizeDiv.accessKey);
  boardSize = document.getElementById("boardSizeDiv").accessKey;
  console.log(`board size, ${boardSize}`);
  document.getElementsByClassName("boardNum")[0].style.display = "block";
  document.getElementsByClassName("boardNum")[1].style.display = "block";
  document.getElementsByClassName("boardNum")[2].style.display = "block";
  let board2 = document.getElementById("board2");
  let board4 = document.getElementById("board4");
  let board6 = document.getElementById("board6");
  if (boardSize === 2) {
    board2.classList.add("selected");
  }
  if (boardSize === 4) {
    board4.classList.add("selected");
  }
  if (boardSize === 6) {
    board6.classList.add("selected");
  }
  board2.addEventListener("click", changeBoardSize);
  board4.addEventListener("click", changeBoardSize);
  board6.addEventListener("click", changeBoardSize);
}

function setNumPlayers() {
  console.log("number of players");
  numPlayers = 2;
}

function setLoadBoard() {
  console.log("load board");
  console.log(
    `accesskey, ${document.getElementById("boardSizeDiv").accessKey}`
  );
  document.getElementById("loadBoard").innerHTML = "Reset Board";
  document.getElementById("loadBoard").style.backgroundColor = "#c4cce1";
  boardSize = document.getElementById("boardSizeDiv").accessKey;
  boardItems = Math.pow(boardSize, 2);
  squaresRemaining = boardItems;
  document.getElementById("big-contanier").style.visibility = "visible";
  createBoardArray();
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
let totalClicks = 0;
let count = 0;
let randomNumberArray = [];
let numPlayers = 1;
let boardSize;
let boardItems = Math.pow(boardSize, 2);
let squaresRemaining = boardItems;

document.getElementById("big-contanier").style.visibility = "hidden";
boardSettings();
// setLoadBoard();
// createBoardArray();
