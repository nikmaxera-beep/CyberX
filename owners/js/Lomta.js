const audio = document.getElementById("bgmusic");
const video = document.getElementById("bg-video");
const volumeSlider = document.getElementById("volume-slider");
const volumeIcon = document.getElementById("volume-icon");
const enterScreen = document.getElementById("enter-screen");

// 1. ლოგიკა რეფრეშის დროს: თუ გათიშულია, დადგეს 10%-ზე
let savedVolume = localStorage.getItem("musicVolume");
let savedMuted = localStorage.getItem("musicMuted") === "true";

if (savedMuted || savedVolume === null || parseFloat(savedVolume) === 0) {
    audio.volume = 0.1;
    audio.muted = false;
    localStorage.setItem("musicMuted", "false");
    localStorage.setItem("musicVolume", "0.1");
} else {
    audio.volume = parseFloat(savedVolume);
    audio.muted = false;
}

volumeSlider.value = audio.volume * 100;
updateIcon(audio.volume);

function updateIcon(volumeValue) {
    if (audio.muted || volumeValue === 0) {
        volumeIcon.className = "fas fa-volume-mute";
    } else if (volumeValue <= 0.5) {
        volumeIcon.className = "fas fa-volume-down";
    } else {
        volumeIcon.className = "fas fa-volume-up";
    }
}

function startExperience() {
    if (enterScreen.style.display === "none") return;

    audio.play().catch(err => console.log("Playback blocked:", err));
    if (video) video.play().catch(() => {});

    enterScreen.style.opacity = "0";
    setTimeout(() => {
        enterScreen.style.display = "none";
    }, 700);
}

enterScreen.addEventListener("click", startExperience);

volumeSlider.addEventListener("input", function () {
    const volumeValue = this.value / 100;
    audio.volume = volumeValue;
    audio.muted = (volumeValue === 0);
    localStorage.setItem("musicVolume", volumeValue);
    localStorage.setItem("musicMuted", audio.muted);
    updateIcon(volumeValue);
});

volumeIcon.addEventListener("click", () => {
    if (audio.muted) {
        audio.muted = false;
        if (audio.volume === 0) {
            audio.volume = 0.1;
            volumeSlider.value = 10;
        }
    } else {
        audio.muted = true;
    }
    localStorage.setItem("musicMuted", audio.muted);
    updateIcon(audio.volume);
});