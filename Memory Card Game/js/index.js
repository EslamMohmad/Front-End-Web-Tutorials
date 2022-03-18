const startBtn = document.querySelector(".start button");
const playAgainBtn = document.querySelector(".play-again");
const leaderBoard = document.querySelector(".leader-board");
const playerData = document.querySelector(".players-data");
const result = document.querySelector(".result");
const app = document.querySelector(".app");
const game = document.querySelector(".game");
const player = document.querySelectorAll(".playerName");
const totalWrongs = document.querySelectorAll(".total-wrongs");
const timer = document.querySelector(".timer");

const store = {};

const imgs = [
  "🌎","🌎",
  "👾","👾",
  "⭐","⭐",
  "🍰","🍰",
  "🔥","🔥",
  "🌼","🌼",
  "🪐","🪐",
  "🪶","🪶"
];

const cards = [];
const filteredArr = [];

let deley;
let taken_time;
let total_wrongs = 0;

let playerN = "";
let stopTime;

const timing = 800;

startBtn.addEventListener("click", function () {
  const parent = this.parentElement;
  const playerInput = this.previousElementSibling;
  
  if (playerInput.value) {
    getRandomContent();
    parent.classList.add("hide");
    app.classList.add("show");
    leaderBoard.classList.add("hide");
    playerN = playerInput.value;
    player.forEach(e => e.innerHTML = playerInput.value);
    takenTime();
    playerInput.value = "";
  }
  
  cards.push(...game.children);
  cards.forEach((e, i, arr) => {
  e.addEventListener("click", function () {
    const target = this.classList;
    if (filteredArr.length < 2 && !target.contains("active")) {
      target.add("active");
      filteredArr.push(this);
      filteredArr.length === 2 && checkSameCards(filteredArr);
    }
    
    const filterActiveCards = [...arr].filter(e => !e.classList.contains("active")).length;
    if (!filterActiveCards) {
      clearInterval(taken_time);
      result.classList.add("show");
      document.querySelector(".player-time").innerHTML = timer.innerHTML;
    }
  });
});
});

playAgainBtn.addEventListener("click", function () {
  result.classList.remove("show");
  leaderBoard.classList.remove("hide");
  startBtn.parentElement.classList.remove("hide");
  app.classList.remove("show");
  
  storePlayerData(playerN, stopTime, total_wrongs);
  
  total_wrongs = 0;
  game.innerHTML = "";
  timer.innerHTML = "00 : 00";
  totalWrongs.forEach(e => e.innerHTML = total_wrongs);
});

function getRandomContent() {
  const randomImgsArr = imgs.sort(() => Math.random() - 0.5);
  
  randomImgsArr.forEach((e) => {
    createGridSystem(e);
  });
}

function createGridSystem(img) {
  const card = document.createElement("div");
  const front = document.createElement("div");
  const back = document.createElement("div");
  
  card.className = "card";
  front.className = "front";
  back.className = "back";
  
  front.innerHTML = "❔";
  back.innerHTML = img;
  
  card.appendChild(front);
  card.appendChild(back);
  game.appendChild(card);
}

function checkSameCards(arr) {
  const firstCard = arr[0].lastElementChild.innerHTML;
  const secondCard = arr[1].lastElementChild.innerHTML;
  
  if (firstCard !== secondCard) {
    deley = setTimeout(removeClassTime, timing);
    total_wrongs++;
    totalWrongs.forEach(e => e.innerHTML = total_wrongs);
  } else {
    filteredArr.length = 0;
    clearTimeout(deley);
  }
}

function takenTime() {
  let sec = "00",
      min = "00";

  let second = sec,
      minute = min;
      
  let totalTime = "";
  
  taken_time = setInterval(() => {
    if (sec < 59) {
      sec++;
      second = addZero(sec);
    } else {
      sec = "00";
      second = sec;
      min++;
      minute = addZero(min);
    }
    totalTime = minute + " : " + second;
    stopTime = totalTime;
    timer.innerHTML = totalTime;
  }, 1000);
  
  function addZero(num) {
    return num < 10 ? "0" + num : num;
  }
  
}

function removeClassTime() {
  filteredArr.forEach(e => e.classList.remove("active"));
  filteredArr.length = 0;
}

function storePlayerData(name, time, wrongs) {
  const contentObj = {name, time, wrongs};
  store[name] = {name, time, wrongs};
  window.localStorage.setItem(name, JSON.stringify(contentObj));
  const obj = JSON.parse(window.localStorage.getItem(store[name].name))
  playerData.innerHTML += HTMLContent(window.localStorage.length, contentObj.name, contentObj.time, contentObj.wrongs);
}

function playersRanking() {
 if (window.localStorage.length > 0) {
   const target = window.localStorage;
   const storage = [];
   
   for (let num = 0; num < target.length; num++) {
    storage.push({[target.key(num)] : JSON.parse(target[target.key(num)])});
   }
  storage.sort((curr, next) => {
    return Object.values(curr)[0]["wrongs"] - Object.values(next)[0]["wrongs"];
  })
  storage.forEach((e, i) => {
    const {name, time, wrongs} = Object.values(e)[0];
    playerData.innerHTML += HTMLContent(i + 1, name, time, wrongs);
  })
 }
}
playersRanking()

function HTMLContent(length, name, time, wrongs) {
  return `
    <tr>
      <th>${length}</th>
      <td>${name}</td>
      <td>${time}</td>
      <td>${wrongs}</td>
    </tr>
  `;
}