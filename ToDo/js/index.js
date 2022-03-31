const input = document.getElementById("input");                  
const add = document.getElementById("add");
const tasks = document.querySelector(".tasks");
const noTMeg = document.querySelector(".no-task");
const clearAllTasks = document.querySelector(".clear");
const completedTasks = document.querySelector(".completedTasks span");            

let taskArr = [];

add.addEventListener("click", function () {
    let inVal = input.value;
    if (inVal) {
      if (!checkExistedTask(inVal)) {
        tasks.appendChild(createTask(inVal));
        tasks.children[0].classList.add("active");
        input.value = "";
        input.focus();
        taskArr.push(inVal);
      } else {
        inputMessage("this task is excite", 1300);
        input.value = "";
      }
    } else {
      inputMessage("no task to add", 1300);
    }
});

function createTask(content) {
  const div = document.createElement("div");
  const p = document.createElement("p");
  const delIcon = document.createElement("div");
  
  delIcon.innerHTML = "-";
  delIcon.className = "delete-icon";
  p.innerHTML = content;
  div.className = "task real-task";
  
  div.append(p, delIcon);
  return div;
}

function inputMessage(txt, time) {
  const message = txt;
  const timing = time;
  input.placeholder = message;
  const timer = setTimeout(() => {
    input.placeholder = "";
    input.focus();
  }, timing);
  !input.placeholder ? clearTimeout(timer) : false;
}

function checkExistedTask(inputVal) {
  return taskArr.includes(inputVal);
}

function deleteTargetItem(item) {
  return taskArr.filter(e => e !== item);
}

clearAllTasks.addEventListener("click", function () {
  taskArr.length = 0;
  completedTasks.innerHTML = 0;
  noTMeg.classList.remove("active");
  tasks.innerHTML = noTMeg.outerHTML;
});

//delegate html element (completedTasks)
tasks.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-icon")) {
    const content = e.target;
    const item = content.previousElementSibling.innerHTML;
      taskArr = deleteTargetItem(item);
      content.parentElement.remove();
      const noTMeg = document.querySelector(".no-task");
      if (tasks.childElementCount >= 2) {
        noTMeg.classList.add("active");
      } else {
        noTMeg.classList.remove("active");
      }
  }
  
  const target = e.target.parentElement.classList;
  if (!target.contains("no-task")) {
    target.toggle("active");
    const length = document.querySelectorAll(".real-task.active").length;
    completedTasks.innerHTML = length;
  }
});