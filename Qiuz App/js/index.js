const start = document.querySelector(".start");
const app = document.querySelector(".app");
const quiz = document.querySelector(".quiz");
const questions = [];
const currentQuetion = document.querySelector(".current");
const totalQuetions = document.querySelectorAll(".total");
const nextQuetion = document.querySelector(".foot .right button");

const timeLeft = document.querySelector(".timer p span");
const timeBar = document.querySelector(".time-bar .bar");

const result = document.querySelector(".result");
const correct = document.querySelector(".correct");
const gameOptions = Array.from(result.lastElementChild.children);

let currentIndex = 0;
const correctAnswers = [];
const getData = [];

let time_left = 10;
let time_bar = 0;
let timing;
const globalTime = 1000;
const reminTime = time_left;

const shufflingIndex = [];
const shufflingData = [];

timeLeft.innerHTML = time_left;

fetch('database/data.json')
.then(response => response.json())
.then(data => {
    totalQuetions.forEach(e => e.innerHTML = data.length + " ");
    
    data.forEach((element, index) => {
     const {question, answer, options} = element;
     createQuestion(index, question, options);
     shufflingIndex.push(index);
    });
    shufflingData.push(...shuffling(shufflingIndex));
    getData.push(...data);
});

start.addEventListener("click", function() {
  questions.push(...Array.from(quiz.children))
  this.classList.add("hide");
  app.classList.add("show");
  renderItems(currentIndex, questions, shufflingData);
  timing = setInterval(time, globalTime);
});

function createQuestion(idx, question, answers) {
  const parent = document.createElement("div");
  parent.className = "questions";
  
  const que = document.createElement("div");
  que.className = "question";
  que.innerHTML = `<h1><span>${idx + 1}. </span>${question}</h1>`;
  
  const answ = document.createElement("div");
  answ.className = "answers";
  
  answers.forEach(e => {
    const p = document.createElement("p");
    p.innerHTML = e;
    answ.appendChild(p);
  });
  
  parent.appendChild(que);
  parent.appendChild(answ);
 
  quiz.appendChild(parent);
}

function checkCorrectAnswer(target, answer, arr) {
  clearInterval(timing);
  if (target.innerHTML === answer) {
    target.classList.add("right", "right-user");
  } else {
    target.classList.add("wrong", "wrong-user");
    const index = Array.from(arr).findIndex(e => e.innerHTML === answer);
    arr[index].classList.add("right", "right-machine");
  }
  arr.forEach(e => e.classList.add("active"));
  nextQuetion.classList.add("active");
}

function renderItems(index, selectors, randomArr) {
  const random = randomArr[index];
  currentQuetion.innerHTML = index + 1 + " ";
  selectors.forEach(e => e.classList.remove("active"));
  selectors[random].classList.add("active");
  globalAnswers(random);
}

nextQuetion.addEventListener("click", function () {
  clearInterval(timing);
  if (currentIndex < questions.length - 1) {
    resetTimeFunc();
    timing = setInterval(time, globalTime);
    currentIndex++;
    renderItems(currentIndex, questions, shufflingData);
    this.classList.remove("active");
  } else {
    app.classList.remove("show");
    result.classList.add("show");
    questions.forEach(element => {
      correctAnswers.push(...element.lastElementChild.children);
    });
    const length = correctAnswers.filter(e => e.classList.contains("right-user")).length;
    correct.innerHTML = length;
  }
});

gameOptions.forEach(element => {
  element.addEventListener("click", function () {
    resetTimeFunc();
    resetValues();
    clearInterval(timing);
    result.classList.remove("show");
    if (this.classList.contains("replay")) {
      replayGameFunc();
    } else if (this.classList.contains("quit")) {
      //quitGameFunc();
    }
  });
});

function replayGameFunc() {
  app.classList.add("show");
  timing = setInterval(time, globalTime);
}

function quitGameFunc() {
  start.classList.remove("hide");
}

function resetValues() {
  currentIndex = 0;
  renderItems(currentIndex, questions, shuffling(shufflingData));
  questions.forEach(element => {
     Array.from(element.lastElementChild.children).forEach(e => e.className = "");
  });
  nextQuetion.classList.remove("active");
  correct.innerHTML = "";
  correctAnswers.length = 0;
}

function globalAnswers(index) {
  const targetAnswer = getData[index].answer;
  const totalAnswers = Array.from(questions[index].lastElementChild.children);
  //click on answer
  totalAnswers.forEach((element, idx, arr) => {
      element.addEventListener("click", function () {
        checkCorrectAnswer(element, targetAnswer, arr);
      });
  });
}

function shuffling(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function choiceAnswerAuto() {
  const random = shufflingData[currentIndex];
  const getAnswer = getData[random].answer;
  const choiceAnswer = Array.from(questions[random].lastElementChild.children);
  const index = choiceAnswer.findIndex(e => e.innerHTML === getAnswer);
  choiceAnswer[index].classList.add("active", "right", "machine");
  choiceAnswer.forEach(e => e.classList.add("active"));
}

function time() {
  const totalBarWidth = timeBar.parentElement.offsetWidth;
  const bar = totalBarWidth / reminTime;
  if (time_left > 0) {
    time_left--;
    timeLeft.innerHTML = time_left;
    time_bar++;
    timeBar.style.maxWidth = (bar * time_bar) + "px";
    time_left === 0 && (
      nextQuetion.classList.add("active"),
      choiceAnswerAuto()
    );
  } else {
    clearTimeout(time);
  }
}

function resetTimeFunc() {
  time_left = reminTime;
  time_bar = 0;
  timeLeft.innerHTML = time_left;
  timeBar.style.maxWidth = 0;
}