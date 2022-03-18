const run = document.querySelector(".run");

const audio = document.querySelector(".audio");
const totalTime = document.querySelector(".duration");
const currentTime = document.querySelector(".currentTime");

let timing;
let min = 0, sec = 0;

run.addEventListener("click", function () {
  const classes = ["fa-caret-right", "fa-grip-lines-vertical"];
  if (this.classList.contains(classes[0])) {
    playMusic(this, classes);
    timing = setInterval(() => {
      setDetailes();
    }, 1000)
  } else {
    pausedMusic(this, classes);
    clearInterval(timing);
  }
})

function playMusic(ele, cls) {
  ele.classList.replace(cls[0], cls[1])
  audio.play();
}

function pausedMusic(ele, cls) {
  ele.classList.replace(cls[1], cls[0]);
  audio.pause();
}

function setDetailes() {
  let total;
  audio.onloadedmetadata = function () {
    total = (this.duration / 60).toFixed(2);
    totalTime.innerHTML = (this.duration / 60).toFixed(2);
  }
  console.log(audio.duration)
  let curr = Math.floor(audio.currentTime);
  if (sec < 59) {
    sec++;
    currentTime.innerHTML = min + ":" + setCurrentTime(sec);
  } else {
    min++;
    sec = 0;
    currentTime.innerHTML = min + ":" + setCurrentTime(sec);
  }
  
  function setCurrentTime(num) {
    return num < 10 ? "0" + num : num
  }
}
setDetailes()

