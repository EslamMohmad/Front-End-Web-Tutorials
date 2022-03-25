const run = document.querySelector(".run");

const audio = document.querySelector(".audio");
const totalTime = document.querySelector(".duration");
const currentTime = document.querySelector(".currentTime");
const song_name = document.querySelector(".songName");
const Artist = document.querySelector(".artist");
const songImg = document.querySelector(".songImg");

const bar = document.querySelector(".barWidth");
const barParent = bar.parentElement;
const totalBarWidth = parseInt(getComputedStyle(bar.parentElement).width);

const moodBtn = document.querySelector(".mood");
const musicListBtn = document.querySelector(".music-list");
const songListData = document.querySelector(".songs");
const closeMusicListBtn = document.querySelector(".fa-times");
const controllsBtns = document.querySelectorAll(".select-N-P-song");

const classes = ["fa-caret-right", "fa-grip-lines-vertical"];
const moodObj = {
  shuffle : "fa-random",
  loopList : "fa-list-check",
  loopSong : "fa-sync-alt"
};
const {shuffle, loopList, loopSong} = moodObj;
const objMoodKeys = Object.keys(moodObj);
const objMoodValues = Object.values(moodObj);

let timing; //setInterval
let min = 0, sec = 0, currTimePoint = 0;
let soundState = false; //state of song (on & off)
let audioDuration; //get audio duration 

let currentMood = 1; // mood class index
let state = ""; //get state of moode

let slectedSongIndex = 0;
let currentSongIndex = 0;

const getSongData = []; //get json data from fetch api
const randomSong = []; //set random indexes in array


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

  songsList.forEach((element, i, arr) => {
    element.addEventListener("click", function() {
      arr.forEach(e => e.classList.remove("active"))
      this.classList.add("active");
      const songIndex = getSongData.findIndex(({songName}) => {
        return songName === element.firstElementChild.children[0].innerHTML
      });
      currentSongIndex = songIndex;
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
      currentSongIndex < getSongData.length - 1 ? currentSongIndex++ : currentSongIndex = 0;
    } else if (this.classList.contains("backward")) {
      currentSongIndex === 0 ? currentSongIndex = getSongData.length - 1 : currentSongIndex--;
    }
    songRenderFunc();
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
  sec = time % 60;
  min = parseInt((time / 60).toString().split(".")[0]);
  currentTime.innerHTML = min + ":" + addZero(sec)
  soundState = false;
})

moodBtn.addEventListener("click", function () {
  if (currentMood < objMoodKeys.length) {
    const clsIndex = this.firstElementChild.classList[1];
    this.firstElementChild.classList.replace(clsIndex, objMoodValues[currentMood])
    state = objMoodValues[currentMood];
    currentMood++;
    currentMood === objMoodKeys.length ? currentMood = 0 : false;
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

audio.onloadedmetadata = function () {
  audioDuration = Math.floor(this.duration);
}

function setSelectedSong(song) {
  const {songName, artist, src, duration, img} = song;
  audio.src = src;
  songImg.src = img;
  totalTime.textContent = duration;
  song_name.innerHTML = songName;
  Artist.innerHTML = artist;
}

function songRenderFunc() {
  [...songListData.children].forEach(e => e.classList.remove("active"));

  songListData.children[currentSongIndex].classList.add("active");
  setSelectedSong(getSongData[currentSongIndex])

  resetSoundDetails();
  run.classList.replace(classes[1], classes[0])
  checkRunBtnState(run);
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

function setSoundDetailes() {
  const total = Math.floor(audio.duration);
  const audioCurrentTime = Math.floor(audio.currentTime);
  //console.log(total + " => total", audioCurrentTime + " : current", sec + " : => second")

  state = moodBtn.firstElementChild.classList[1];
  
  sec = audioCurrentTime % 60;
  min = parseInt((audioCurrentTime / 60).toString().split(".")[0]);
  currentTime.innerHTML = min + ":" + addZero(sec);

  if (audioCurrentTime === total) {
    run.classList.replace(classes[1], classes[0]);
    clearInterval(timing);
    soundState = true;
    checkStateMood();
    return;
  }

  //(audioCurrentTime + 1) => to assgin it to current, second starting in the same time
  currTimePoint = (audioCurrentTime + 1) * (totalBarWidth / total);
  bar.style.width = currTimePoint + "px";
}

function resetSoundDetails() {
  audio.currentTime = 0;
  sec = 0, min = 0, currTimePoint = 0 + "px";
  soundState = false;
  bar.style.width = currTimePoint;
  currentTime.innerHTML = min + ":" + addZero(sec);
  clearInterval(timing)
}

function addZero(num) {
  return num < 10 ? "0" + num : num
}

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
  [...songListData.children].forEach((e, i) => {randomSong.push(i); e.classList.remove("active")})
  randomSong.sort(() => Math.random() - 0.5); //generate random array of indexes
  
  songListData.children[randomSong[currentSongIndex]].classList.add("active");
  setSelectedSong(getSongData[randomSong[currentSongIndex]])

  resetSoundDetails();
  run.classList.replace(classes[1], classes[0])
  checkRunBtnState(run);
}

function loopListMoodFunc() {
  currentSongIndex < getSongData.length - 1 ? currentSongIndex++ : currentSongIndex = 0;
  songRenderFunc();
}

function loopSongMoodFunc() {
  resetSoundDetails();
  checkRunBtnState(run);
}

function checkStateMood() {
  if (state === shuffle) {
    shufflingMoodFunc()
  } else if (state === loopList) {
    loopListMoodFunc()
  } else if (state === loopSong) {
    loopSongMoodFunc();
  }
}