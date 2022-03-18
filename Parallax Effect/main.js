const ele = document.querySelectorAll(".bord")[0];
const txt = document.querySelector(".bord h1");
let i = 0;
window.onscroll = function () {
    let scrollVal = this.scrollY;
    ele.style.backgroundPositionY = (scrollVal / 3) + "px";
    txt.style.transform = `translateY(${scrollVal / 1.8}px) scale(${(scrollVal / 900) + 1})`;
    txt.style.opacity = (-scrollVal / 700) + 1;
}