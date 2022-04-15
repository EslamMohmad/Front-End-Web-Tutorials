const cursor = document.querySelector("#cursor");
const list = document.querySelectorAll(".navBar li");
const headerText = document.querySelector("h1");

window.addEventListener("mousemove", function (e) {
  const { clientX: x, clientY: y } = e;

  cursor.style.left = `${x}px`;
  cursor.style.top = `${y}px`;
});

list.forEach((element) => {
  element.addEventListener("mouseover", function () {
    cursor.classList.add("active");
  });

  element.addEventListener("mouseleave", function () {
    cursor.classList.remove("active");
  });
});
