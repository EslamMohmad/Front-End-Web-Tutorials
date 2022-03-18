const run = document.querySelector(".run");

const audio = document.querySelector(".audio");
const totalTime = document.querySelector(".duration");
const currentTime = document.querySelector(".currentTime");

const bar = document.querySelector(".barWidth");
const barParent = bar.parentElement;
const totalBarWidth = parseInt(getComputedStyle(bar.parentElement).width);

const classes = ["fa-caret-right", "fa-grip-lines-vertical"];
const startCursorPoint = "3.5%";

let timing;
let min = 0, sec = -1, currTime = 0;
let soundState = false;

let audioDuration;

run.addEventListener("click", function () {
  if (!soundState) {
    checkRunBtnState(this);
  } else {
    resetSoundDetails();
    checkRunBtnState(this)
  }
})

barParent.addEventListener("click", function (e) {
  const pointed = e.offsetX;
  bar.style.width = pointed + "px";
  // console.log(Math.floor(audioDuration - totalBarWidth / pointed))
})

function playMusic(ele, cls) {
  ele.classList.replace(cls[0], cls[1])
  audio.play();
}

function pausedMusic(ele, cls) {
  ele.classList.replace(cls[1], cls[0]);
  audio.pause();
}

function setSoundDetailes() {
  setAudioDuration();

  const total = Math.floor(audio.duration);
  let curr = Math.floor(audio.currentTime);

  if (curr === total) {
    soundState = true;
    run.classList.replace(classes[1], classes[0]);
    clearInterval(timing)
    return;
  };

  if (sec < 59) {
    sec++;
    currentTime.innerHTML = min + ":" + setCurrentTime(sec);
  } else {
    min++;
    sec = 0;
    currentTime.innerHTML = min + ":" + setCurrentTime(sec);
  }
  
  currTime = sec * totalBarWidth / total;
  bar.style.width = currTime + "px";
}
setSoundDetailes()

function resetSoundDetails() {
  sec = 0, min = 0, currTime = startCursorPoint;
  soundState = false;
  bar.style.width = currTime;
  currentTime.innerHTML = min + ":" + setCurrentTime(sec);
}

function setCurrentTime(num) {
  return num < 10 ? "0" + num : num
}

function setAudioDuration() {
  audio.onloadedmetadata = function () {
    audioDuration = Math.floor(this.duration);
    this.duration < 60
    ? totalTime.innerHTML = "0:0" + Math.floor(this.duration)
    : totalTime.innerHTML = Math.floor(this.duration)
  }
}

function checkRunBtnState(element) {
  if (element.classList.contains(classes[0])){
    playMusic(element, classes);
    timing = setInterval(() => {
      setSoundDetailes();
    }, 1000);
  } else {
    pausedMusic(element, classes);
    clearInterval(timing);
  }
}