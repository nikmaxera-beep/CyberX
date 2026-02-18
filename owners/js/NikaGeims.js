// Elements
const audio = document.getElementById("audio");
const video = document.getElementById("bg-video"); 
const volumeSlider = document.getElementById("volume-slider");
const volumeIcon = document.getElementById("volume-icon");
const enterScreen = document.getElementById("enter-screen");

// წამოვიღოთ შენახული მონაცემები
let savedVolume = localStorage.getItem("musicVolume");
let wasMuted = localStorage.getItem("musicMuted") === "true";

// ლოგიკა: თუ ხმა 0-ზე იყო ან დამიუტებული, დავაყენოთ 0.1 (10%)
if (savedVolume === null || parseFloat(savedVolume) <= 0 || wasMuted) {
    audio.volume = 0.1;
    audio.muted = false; // ვაიძულებთ ხმის ჩართვას
} else {
    audio.volume = parseFloat(savedVolume);
    audio.muted = false;
}

// საწყისი მნიშვნელობების მინიჭება სლაიდერისთვის და იკონკისთვის
volumeSlider.value = audio.volume * 100;
updateIcon(audio.volume);

/**
 * ხატულას განახლების ფუნქცია
 */
function updateIcon(volume) {
    if (volume === 0 || audio.muted) {
        volumeIcon.classList.replace("fa-volume-up", "fa-volume-mute");
        volumeIcon.classList.replace("fa-volume-down", "fa-volume-mute");
    } else if (volume <= 0.5) {
        volumeIcon.classList.replace("fa-volume-mute", "fa-volume-down");
        volumeIcon.classList.replace("fa-volume-up", "fa-volume-down");
    } else {
        volumeIcon.classList.replace("fa-volume-mute", "fa-volume-up");
        volumeIcon.classList.replace("fa-volume-down", "fa-volume-up");
    }
}

/**
 * საიტზე შესვლის ფუნქცია
 */
function startExperience() {
    if (enterScreen.style.display === 'none') return;

    // დაზღვევა: თუ ხმა მაინც 0-ზეა, ავუწიოთ 10%-ზე
    if (audio.volume <= 0) {
        audio.volume = 0.1;
        volumeSlider.value = 10;
    }

    audio.play().catch(error => console.log("Audio play failed:", error)); 
    if (video) video.play().catch(error => console.log("Video play failed:", error)); 

    enterScreen.style.opacity = '0';
    setTimeout(() => {
        enterScreen.style.display = 'none';
    }, 700);

    updateIcon(audio.volume);
}

// 1. მაუსით დაჭერისას (Click)
enterScreen.addEventListener("click", startExperience);

// 2. "Enter" ღილაკზე დაჭერისას
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        startExperience();
    }
});

// =====================
// VOLUME SLIDER ლოგიკა
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
// ხმის ჩართვა/გამორთვა იკონკით
// =====================
volumeIcon.addEventListener("click", () => {
    if (audio.muted || audio.volume === 0) {
        audio.muted = false;
        // თუ ხმა 0-ზეა, Unmute-ის დროს ავუწიოთ 10%-ზე
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