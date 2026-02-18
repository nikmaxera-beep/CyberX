const audio = document.getElementById("bgmusic");
const video = document.getElementById("bg-video"); // დარწმუნდი, რომ HTML-ში ვიდეოს id="bg-video" აქვს
const volumeSlider = document.getElementById("volume-slider");
const volumeIcon = document.getElementById("volume-icon");
const enterScreen = document.getElementById("enter-screen");

// წამოვიღოთ შენახული მონაცემები LocalStorage-დან
let savedVolume = localStorage.getItem("musicVolume");
let savedMuted = localStorage.getItem("musicMuted") === "true";

// ლოგიკა: თუ პირველად შედის ან ხმა 0-ზე იყო/დამუტული იყო, დავაყენოთ 0.1 (10%)
if (savedVolume === null || parseFloat(savedVolume) <= 0 || savedMuted) {
    audio.volume = 0.1;
    savedMuted = false;
} else {
    audio.volume = parseFloat(savedVolume);
}

// საწყისი მნიშვნელობების მინიჭება ვიზუალისთვის
volumeSlider.value = audio.volume * 100;
audio.muted = savedMuted;
updateIcon(audio.volume);

/**
 * ხატულას განახლების ფუნქცია
 */
function updateIcon(volumeValue) {
    if (audio.muted || volumeValue === 0) {
        volumeIcon.className = "fas fa-volume-mute";
    } else if (volumeValue <= 0.5) {
        volumeIcon.className = "fas fa-volume-down";
    } else {
        volumeIcon.className = "fas fa-volume-up";
    }
}

/**
 * საიტზე "შესვლის" ფუნქცია (ვიდეო + აუდიო)
 */
function startExperience() {
    if (enterScreen.style.display === "none") return;

    // თუ ხმა რამენაირად 0-ზეა, ავუწიოთ 10%-მდე ჩართვისას
    if (audio.volume <= 0) {
        audio.volume = 0.1;
        volumeSlider.value = 10;
    }
    audio.muted = false;

    audio.play().catch(() => console.log("Audio blocked"));
    if (video) video.play().catch(() => console.log("Video blocked"));

    enterScreen.style.opacity = "0";
    setTimeout(() => {
        enterScreen.style.display = "none";
    }, 700);
    
    updateIcon(audio.volume);
}

// =====================
// ჩართვა CLICK-ით და ENTER-ით
// =====================
enterScreen.addEventListener("click", startExperience);

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") startExperience();
});

// =====================
// VOLUME SLIDER
// =====================
volumeSlider.addEventListener("input", function () {
    const volumeValue = this.value / 100;
    audio.volume = volumeValue;
    audio.muted = (volumeValue === 0);

    localStorage.setItem("musicVolume", volumeValue);
    localStorage.setItem("musicMuted", audio.muted);
    
    updateIcon(volumeValue);
});

// =====================
// MUTE CLICK
// =====================
volumeIcon.addEventListener("click", () => {
    if (audio.muted) {
        audio.muted = false;
        // თუ ხმას ვრთავთ და 0-ზეა, ავტომატურად ავუწიოთ 10%-ზე
        if (audio.volume === 0) {
            audio.volume = 0.1;
            volumeSlider.value = 10;
        } else {
            volumeSlider.value = audio.volume * 100;
        }
    } else {
        audio.muted = true;
        volumeSlider.value = 0;
    }
    
    localStorage.setItem("musicMuted", audio.muted);
    localStorage.setItem("musicVolume", audio.volume);
    updateIcon(audio.volume);
});