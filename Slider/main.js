const imgsList = document.querySelectorAll(".slider .slide");
const slider = document.querySelector(".slider");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const imgsLength = imgsList.length - 1;

let currentIndex = 0;

//create pengenation
document.querySelector(".disc").innerHTML = Array.from(imgsList).map((el, idx) => {
  return `<span Img="${idx}"></span>`;
}).join("");

const currentImg = document.querySelectorAll(".disc span");

currentImg.forEach((el,idx,arr) => {
  el.addEventListener("click", function () {
    const targetIndex = parseInt(this.getAttribute("Img"));
    const targetImg = imgsList[targetIndex].offsetLeft;
    slider.style.transform = `translateX(-${targetImg }px)`;
    
    arr.forEach(ele => {
      ele.classList.remove("active");
      ele.innerHTML = "";
    });
    el.classList.add("active");
    el.innerHTML = idx + 1;
    currentIndex = targetIndex;
    
    check();
  });
});

currentImg[0].className = "active";
currentImg[0].innerHTML = 1;

imgsList[0].classList.add("active");

next.addEventListener("click", () => {
  currentIndex !== imgsLength
  ? (currentIndex++, transformFunc("-"))
  : false;
});

prev.addEventListener("click", () => {
  currentIndex >= 1
  ? (currentIndex--, transformFunc("+"))
  : false;
});

const transformFunc = (operator) => {
  const imgLocathin =
  imgsList[currentIndex].offsetLeft;
  const htmlContent = parseInt(currentImg[currentIndex].getAttribute("Img")) + 1;
  
  slider.style.transform = `translateX(-${imgLocathin}px)`;
  
  currentImg.forEach(ele => {
    ele.innerHTML = "";
    ele.classList.remove("active");
  });
  
  currentImg[currentIndex].classList.add("active");
  currentImg[currentIndex].innerHTML = htmlContent;
  
  check();
};

function check() {
  switch (currentIndex) {
    case imgsLength:
      prev.classList.remove("active");
      next.classList.add("active");
      break;
    case 0:
      prev.classList.add("active");
      next.classList.remove("active");
      break;
    default:
      prev.classList.remove("active");
      next.classList.remove("active");
  }
}
check();