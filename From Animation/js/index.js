const slideBoard = document.querySelector(".sliding-board");
const singUp = document.querySelector(".singUp");
const singIn = document.querySelector(".singIn");

const slidingState = document.querySelector(".main");

singIn.addEventListener("click", function () {
  slideBoard.classList.add("sliding");
  slidingState.classList.replace("sing-up", "sing-in");
});

singUp.addEventListener("click", function () {
  slideBoard.classList.remove("sliding");
  slidingState.classList.replace("sing-in", "sing-up");
});
