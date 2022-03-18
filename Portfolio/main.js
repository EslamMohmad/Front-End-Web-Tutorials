function getData(search) {
  fetch("data.json")
  .then(res => res.json())
  .then((photos) => {
    const parent = document.querySelectorAll(".items .parent");
    const limit = Math.floor(photos.length / parent.length);
    
    parent.forEach(element => {
      if (element.childElementCount <= limit) {
        for (let i = 0; i < limit; i++) {
          const div = document.createElement("div");
          setClass(div);
          element.appendChild(div);
        }
      }
    });
    
    const bord = document.querySelectorAll(".parent .bord");
    
    photos.forEach((e, i) => {
      const img = document.createElement("img");
      img.src = e;
      bord[i].appendChild(img);
    });
  });
}

getData();

function setClass(tag) {
  const size = ["sm", "md", "lg"];
  const randomSize = random(size);
  
  const allClasses = [
    "bord",
    "show",
    size[randomSize]
  ];
  
  tag.classList.add(...allClasses);
}

function random(target) {
  const num = Math.floor(Math.random() * target.length);
  return num < target.length ? num : false;
}