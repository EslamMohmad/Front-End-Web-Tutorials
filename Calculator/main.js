const numbers = document.querySelector(".numbers");        

for (let i = 0; i < 10; i++) {
  numbers.innerHTML += `
    <div class="num click operation">${i}</div>
  `;
}

const allBtns = document.querySelectorAll(".operation");
const input = document.getElementById("input");
const result = document.querySelector(".result");
const clear = document.querySelector(".clear");
const Delete = document.querySelector(".delete");
const Close = document.querySelector(".close");


allBtns.forEach(ele => {
  ele.addEventListener("click",function () {
    const txt = ele.innerHTML;
    input.value += txt;
    checkOprs(input.value)
  });
});

result.addEventListener("click", function () {
  input.value = eval(input.value);
});

clear.addEventListener("click", function () {
  input.value = "";
});

Delete.addEventListener("click", function () {
  let res = input.value.substr(0, input.value.length - 1);
  input.value = res;
});

/*Close.addEventListener("click", function () {
  window.close()
});*/

function checkOprs(str) {
  const REG = new RegExp(/[/,*,+,\-]/gi);
  const index = str.search(REG);
}