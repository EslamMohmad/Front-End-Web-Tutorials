const gamePlay = document.querySelector(".gamePlay");
const results = document.querySelector(".results");
const winNum = document.querySelectorAll(".results .num");
const gameMood = document.querySelectorAll(".gamePlay .mood");
const start = document.querySelector(".start");
const choicePlayer = document.querySelectorAll(".start button");
const game = document.querySelector(".game");
const translateBord = document.querySelector(".game .bord");
const players = document.querySelectorAll(".game .player");
const disc = Array.from(document.querySelectorAll(".grid .disc"));
const winnerMsgBox = document.querySelector(".winner");
const noWinnerMsgBox = document.querySelector(".noWinner");
const playAgainBtn = document.querySelectorAll(".playAgain");

let turn = "";
let gameState = true;
let winner = "";
let mood = "";
let botPlayer = "";

gameMood.forEach(element => {
  element.addEventListener("click", function () {
    gamePlay.classList.remove("active");
    start.classList.add("active");
    results.classList.add("active");
    mood = this.classList[1];
    if (mood === "sigle") {
      ChoicePlayer();
    } else {
      ChoicePlayer();
    }
  });
});

function ChoicePlayer() {
  choicePlayer.forEach(element => {
    element.addEventListener("click", function () {
      turn = this.id;
      start.classList.remove("active");
      game.classList.add("active");
      state(turn);
    });
  });
}

disc.forEach((element,idx,arr) => {
  element.addEventListener("click", function() {
    if (gameState) {
      if (!this.innerHTML) {
        this.innerHTML = turn;
        arr.forEach(e => e.classList.add("unclickable"));
        checkWinner(turn);
        turn === "x" ? turn = "o" : turn = "x";
        state(turn);
        mood === "sigle"
        ? (setTimeout(function() {bot(turn, arr)}, 500))
        : (false);
      }
    }
  });
});

function state(type) {
  if (gameState) {
    const targetPlayer = document.querySelector(`.game .player-${type}`);
    translateBord.style.transform = `translateX(${targetPlayer.offsetLeft - 5}px)`;
    players.forEach(e => e. classList.remove("active"));
    targetPlayer.classList.add("active");
  }
}

function bot(type, arr) {
  if (gameState) {
    botPlayer = type;
    const result = Array.from(disc).filter(e => !e.innerHTML);
    const random = Math.floor(Math.random() * result.length);
    if (result.length > 0) {
      result[random].innerHTML = type;
      arr.forEach(e => e.classList.remove("unclickable"));
      checkWinner(type);
      turn === "x" ? turn = "o" : turn = "x";
      state(turn);
    }
  }
}

function getItems(idx1, idx2, idx3, player) {
  if (
  disc[idx1].innerHTML === player &&
  disc[idx2].innerHTML === player &&
  disc[idx3].innerHTML === player
  ) {
    return true;
  }
}

function checkWinner(type) {
  const endGame = disc.filter(e => e.innerHTML);
  if (
    getItems(0,1,2,type) ||
    getItems(3,4,5,type) ||
    getItems(6,7,8,type) ||
    getItems(0,3,6,type) ||
    getItems(1,4,7,type) ||
    getItems(2,5,8,type) ||
    getItems(0,4,8,type) ||
    getItems(2,4,6,type)
    ) {
    gameState = false;
    winner = type;
    winnerMsgBox.classList.add("active");
    game.classList.remove("active");
    const win = document.querySelector(`.results .${winner} span`);
    win.innerHTML = Number(win.innerHTML) + 1;
    winnerMsgBox.firstElementChild.children[0].innerHTML = winner;
  } else if (endGame.length === disc.length){
    noWinner();
  }
}

playAgainBtn.forEach(element => {
  element.addEventListener("click", function () {
    gameState = true;
    disc.forEach(e => e.classList.remove("unclickable"));
    winnerMsgBox.classList.remove("active");
    noWinnerMsgBox.classList.remove("active");
    disc.forEach(e => e.innerHTML = "");
    game.classList.add("active");
    botPlayer === winner ? bot(botPlayer): false;
    turn === "x" ? turn = "o" : turn = "x";
    state(turn);
  });
});

function noWinner() {
  gameState = false;
  game.classList.remove("active");
  noWinnerMsgBox.classList.add("active");
}