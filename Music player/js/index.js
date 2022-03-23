const run = document.querySelector(".run");

const audio = document.querySelector(".audio");
const totalTime = document.querySelector(".duration");
const currentTime = document.querySelector(".currentTime");
const song_name = document.querySelector(".songName");
const Artist = document.querySelector(".artist");

const bar = document.querySelector(".barWidth");
const barParent = bar.parentElement;
const totalBarWidth = parseInt(getComputedStyle(bar.parentElement).width);

const moodBtn = document.querySelector(".mood");
const musicListBtn = document.querySelector(".music-list");
const songListData = document.querySelector(".songs");
const closeMusicListBtn = document.querySelector(".fa-times");
const controllsBtns = document.querySelectorAll(".select-N-P-song");

const classes = ["fa-caret-right", "fa-grip-lines-vertical"];
const startCursorPoint = totalBarWidth * 3.5 / 100;
const moodObj = {
  shuffle : "fa-random",
  loopList : "fa-redo-alt",
  loopSong : "fa-sync-alt"
};
const {shuffle, loopList, loopSong} = moodObj;
const objKeys = Object.keys(moodObj);
const objValues = Object.values(moodObj);

let timing;
let min = 0, sec = -1, currTimePoint = 0;
let soundState = false;
let audioDuration;

let currentMood = 1;
let state = "";

let slectedSongIndex = 0;
let currentSongIndex = 0;

const getSongData = [];

fetch("database/data.json")
.then(res => res.json())
.then(data => {
  data.forEach(({songName, artist, src, duration}) => {
    songListData.appendChild(setSongs(songName, artist, src, duration));
  })
  getSongData.push(...data);

  const songsList = Array.from(songListData.children);
  songsList[slectedSongIndex].classList.add("active");
  setSelectedSong(getSongData[slectedSongIndex])
  setSoundDetailes();

  songsList.forEach((element, i, arr) => {
    element.addEventListener("click", function() {
      arr.forEach(e => e.classList.remove("active"))
      this.classList.add("active");
      const songIndex = getSongData.findIndex(({songName}) => {
        return songName === element.firstElementChild.children[0].innerHTML
      });
      setSelectedSong(getSongData[songIndex])
      resetSoundDetails();
      run.classList.replace(classes[1], classes[0])
      checkRunBtnState(run);
      document.querySelector(".all-music").classList.remove("active");
    })
  })
})

controllsBtns.forEach(element => {
  element.addEventListener("click", function () {
    if (this.classList.contains("forward")) {
      if (currentSongIndex < getSongData.length) {
        currentSongIndex++;
        setSelectedSong(getSongData[currentSongIndex])
        currentSongIndex === getSongData.length - 1 ? currentSongIndex = -1 : false;
      }
      resetSoundDetails();
      run.classList.replace(classes[1], classes[0])
      checkRunBtnState(run);
    } else if (this.classList.contains("backward")) {

    }
  })
})

run.addEventListener("click", function () {
  if (!soundState) { //check if song end or not
    checkRunBtnState(this);
  } else {
    resetSoundDetails();
    checkRunBtnState(this);
  }
})

barParent.addEventListener("click", function (e) {
  const pointed = e.offsetX;
  bar.style.width = pointed + "px";
  
  const time  = Math.round(pointed / (totalBarWidth / audioDuration));
  audio.currentTime = time;
  sec = time;
  currentTime.innerHTML = min + ":" + setCurrentTime(sec);
  soundState = false;
})

moodBtn.addEventListener("click", function () {
  if (currentMood < objKeys.length) {
    const target = objKeys[currentMood];
    const cls = this.firstElementChild.classList[1];
    this.firstElementChild.classList.replace(cls, objValues[currentMood])
    state = objValues[currentMood];
    currentMood++;
    currentMood === objKeys.length ? currentMood = 0 : false;
  }
})

musicListBtn.addEventListener("click", function () {
  const list = document.querySelector("." + this.getAttribute("data-list"));
  list.classList.add("active");
})

closeMusicListBtn.addEventListener("click", function () {
  const list = document.querySelector("." + this.getAttribute("data-list"));
  list.classList.remove("active");
})

function setSelectedSong(song) {
  const {songName, artist, src, duration} = song;
  audio.src = src;
  totalTime.textContent = duration;
  song_name.innerHTML = songName;
  Artist.innerHTML = artist;
}


function setSongs(songName, artist, src, duration) {
  const song = document.createElement("div");
  const left = document.createElement("div");
  const right = document.createElement("div");
  
  song.className = "song";
  left.className = "left";
  right.className = "right";
  
  left.innerHTML = `
    <h5>${songName}</h5>
    <h6>${artist}</h6>
  `;
  
  right.innerHTML = `<p>${duration}</p>`;
  
  song.appendChild(left);
  song.appendChild(right);
  
  return song;
}

function playMusic(ele, cls) {
  ele.classList.replace(cls[0], cls[1])
  audio.play();
}

function pausedMusic(ele, cls) {
  ele.classList.replace(cls[1], cls[0]);
  audio.pause();
}

function setSoundDetailes(song) {
  const total = Math.floor(audio.duration);
  const audioCurrentTime = Math.floor(audio.currentTime);
  
  //console.log(total + " => total", audioCurrentTime + " : current", sec + " : => second")

  state = moodBtn.firstElementChild.classList[1];
  
  //(audioCurrentTime + 1) => to assgin it to current, second starting in the same time
  currTimePoint = (audioCurrentTime + 1) * (totalBarWidth / total);
  bar.style.width = currTimePoint + "px";
  
  if (sec < 59) {
    sec++;
    currentTime.innerHTML = min + ":" + setCurrentTime(sec);
  } else {
    min++;
    sec = 0;
    currentTime.innerHTML = min + ":" + setCurrentTime(sec);
  }

  if (audioCurrentTime === total - 1) { //before ending
    run.classList.replace(classes[1], classes[0]);
    clearInterval(timing);
    soundState = true;
    checkStateMood();
  }
}

function resetSoundDetails() {
  audio.currentTime = 0;
  sec = 0, min = 0, currTimePoint = 0 + "px";
  soundState = false;
  bar.style.width = currTimePoint;
  currentTime.innerHTML = min + ":" + setCurrentTime(sec);
  clearInterval(timing)
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

// setAudioDuration();

function checkRunBtnState(element) {
  if (element.classList.contains(classes[0])) {
    playMusic(element, classes);
    timing = setInterval(() => {
      setSoundDetailes();
    }, 1000);
  } else {
    pausedMusic(element, classes);
    clearInterval(timing);
  }
}

function shufflingMoodFunc() {
  
}

function loopListMoodFunc() {
  
}

function loopSongMoodFunc() {
  resetSoundDetails();
  checkRunBtnState(run);
}

function checkStateMood() {
  if (state === shuffle) {
    
  } else if (state === loopList) {
    
  } else if (state === loopSong) {
    loopSongMoodFunc();
  }
}