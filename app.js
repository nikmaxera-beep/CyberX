const music = document.getElementById("bg-music");
const slider = document.getElementById("volume-slider");
const icon = document.getElementById("volume-icon");
const enterScreen = document.getElementById("enter-screen");

/* DEFAULT */
music.volume = 0.5;
music.loop = true;
let isMuted = false;

/* ENTER SCREEN CLICK */
enterScreen.addEventListener("click", function () {
    music.play().catch(() => { });
    enterScreen.style.opacity = "0";
    setTimeout(() => { enterScreen.style.display = "none"; }, 600);
});

/* VOLUME SLIDER */
slider.addEventListener("input", function () {
    const volumeValue = this.value / 100;
    music.volume = volumeValue;
    if (volumeValue === 0) {
        music.muted = true;
        icon.classList.replace("fa-volume-up", "fa-volume-mute");
        isMuted = true;
    } else {
        music.muted = false;
        icon.classList.replace("fa-volume-mute", "fa-volume-up");
        isMuted = false;
    }
});

/* ICON CLICK */
icon.addEventListener("click", function () {
    if (!isMuted) {
        music.muted = true;
        slider.value = 0;
        icon.classList.replace("fa-volume-up", "fa-volume-mute");
        isMuted = true;
    } else {
        music.muted = false;
        music.volume = 0.5;
        slider.value = 50;
        icon.classList.replace("fa-volume-mute", "fa-volume-up");
        isMuted = false;
    }
});
