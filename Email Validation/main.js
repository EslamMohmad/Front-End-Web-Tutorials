const email = document.getElementById("email");
const message = document.querySelector(".result .message");
const link = message.parentElement.children[1];
const icon = document.querySelector(".icon");

email.onkeyup = function(event) {
    const validation = [
        "@yahoo.com",
        "@gmail.com",
        "@outlook.com",
        "@icloud.com",
        "@yandex.com"
    ];
    const value = event.target.value;
    const startIndex = value.search("@");
    const check = value.substring(startIndex, value.lenght);
    const index = validation.indexOf(check);

    if (value) {
        if (check === validation[index]) {

            icon.className = "icon right";
            icon.innerHTML = "✓";

            message.innerHTML = "your email address is valid";
            message.className = "message right";

            const visitLink = value.substring(startIndex + 1, value.lenght)
            link.href = `https://www.${visitLink}`;
            link.innerHTML = "visit site";
            link.classList.add("active");
        } else {
            icon.className = "icon wrong";
            icon.innerHTML = "x";

            message.className = "message wrong";
            message.innerHTML = "please enter valid email address";

            link.innerHTML = "";
            link.classList.remove("active");
        }
    } else {
        icon.className = "icon";
        icon.innerHTML = "";
        message.innerHTML = "";
        link.classList.remove("active")

        link.classList.remove("active");
        link.innerHTML = "";
    }
}
