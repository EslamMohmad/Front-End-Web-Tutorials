const clock = document.querySelector(".clock");
const time = clock.children[0];
const second = clock.children[1];
const minute = clock.children[2];
const hour = clock.children[3];

for(let i = 0; i < 12; i++) {
  time.innerHTML += `
  <div style="transform: rotate(${i * 30}deg)">
    <span style="transform: rotate(${-120 - (i * 30)}deg)">${i + 1}</span>
  </div>`;
}

setInterval(() => day(), 1000);

day();

function day() {
  const currentTime = new Date();
  const localSec = currentTime.getSeconds() * 6;
  const localMin = currentTime.getMinutes() * 6;
  const localHour = currentTime.getHours() * 30;

  const transformStyle = (t) => {
    return "translateX(-50%) translateY(-50%) rotate("+t+"deg)";
  };
  
  hour.style.transform = transformStyle(localHour+(localMin/12));
  minute.style.transform = transformStyle(localMin);
  second.style.transform = transformStyle(localSec);

}