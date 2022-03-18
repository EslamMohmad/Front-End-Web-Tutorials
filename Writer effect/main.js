const type = document.getElementById("type");
const cursor = document.getElementById("cursor");

const textArr = [
  "front end",
  "back end",
  "ux ui",
  "wordpress"
];

const typeDelay = 200;
const erasingDelay = 50;
const nextTextDelay = 2000;

let currentText = 0,
    currentLetter = 0;
    
function typing (){
  if (currentLetter < textArr[currentText].length) {
    type.textContent += textArr[currentText].charAt(currentLetter);
    currentLetter++;
    setTimeout(typing, typeDelay);
    cursor.classList.remove("active");
  } else {
    cursor.classList.add("active");
    setTimeout(erasing, erasingDelay + 1950);
  }
}

function erasing () {
  if (currentLetter > 0) {
    type.textContent = textArr[currentText].substring(0, currentLetter - 1);
    currentLetter--;
    setTimeout(erasing, erasingDelay);
    cursor.classList.remove("active")
  } else {
    cursor.classList.add("active")
    currentText++;
    if (currentText >= textArr.length) {
      currentText = 0;
    }
    setTimeout(typing, nextTextDelay);
  }
}

addEventListener("DOMContentLoaded", function () {
  cursor.classList.add("active")
  setTimeout(typing, typeDelay + 1900);
});
