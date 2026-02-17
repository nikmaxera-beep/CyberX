// Elements
const audio = document.getElementById("audio");
const volumeSlider = document.getElementById("volume-slider");
const volumeIcon = document.getElementById("volume-icon");
const enterScreen = document.getElementById("enter-screen");

let isMuted = false;

// Default volume
audio.volume = 0.5;

// =====================
// CLICK TO ENTER
// =====================
enterScreen.addEventListener("click", () => {
    // მუსიკის ჩართვა
    audio.play().catch(() => {});  

    // Overlay fade-out
    enterScreen.style.opacity = '0';
    setTimeout(() => {
        enterScreen.style.display = 'none';
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
        volumeIcon.classList.replace("fa-volume-up", "fa-volume-mute");
        isMuted = true;
    } else {
        audio.muted = false;
        volumeIcon.classList.replace("fa-volume-mute", "fa-volume-up");
        isMuted = false;
    }
});

// =====================
// MUTE/UNMUTE ICON CLICK
// =====================
volumeIcon.addEventListener("click", () => {
    if (isMuted) {
        audio.muted = false;
        volumeIcon.classList.replace("fa-volume-mute", "fa-volume-up");
        volumeSlider.value = audio.volume * 100;
        isMuted = false;
    } else {
        audio.muted = true;
        volumeIcon.classList.replace("fa-volume-up", "fa-volume-mute");
        volumeSlider.value = 0;
        isMuted = true;
    }
});
