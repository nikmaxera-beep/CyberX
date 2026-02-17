const audio = document.getElementById("bgmusic");
const volumeSlider = document.getElementById("volume-slider");
const volumeIcon = document.getElementById("volume-icon");
const enterScreen = document.getElementById("enter-screen");

let isMuted = false;

// Default volume
audio.volume = 1;

// =====================
// CLICK TO ENTER
// =====================
enterScreen.addEventListener("click", () => {
    audio.play().catch(() => {});
    enterScreen.style.opacity = "0";

    setTimeout(() => {
        enterScreen.style.display = "none";
    }, 700);
});

// =====================
// VOLUME SLIDER
// =====================
volumeSlider.addEventListener("input", function () {
    const volumeValue = this.value / 100;
    audio.volume = volumeValue;

    if (volumeValue === 0) {
        audio.muted = true;
        volumeIcon.className = "fas fa-volume-mute";
        isMuted = true;
    } else if (volumeValue <= 0.5) {
        audio.muted = false;
        volumeIcon.className = "fas fa-volume-down";
        isMuted = false;
    } else {
        audio.muted = false;
        volumeIcon.className = "fas fa-volume-up";
        isMuted = false;
    }
});

// =====================
// MUTE CLICK
// =====================
volumeIcon.addEventListener("click", () => {
    if (audio.muted) {
        audio.muted = false;
        volumeSlider.value = audio.volume * 100;
        volumeIcon.className = "fas fa-volume-up";
    } else {
        audio.muted = true;
        volumeSlider.value = 0;
        volumeIcon.className = "fas fa-volume-mute";
    }
});
