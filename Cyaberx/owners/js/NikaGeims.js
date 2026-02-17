const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const volumeSlider = document.getElementById("volume-slider");

audio.volume = 0.5;

// Browser autoplay block fix
document.addEventListener("click", () => {
    if (audio.paused) {
        audio.play().catch(() => {});
    }
}, { once: true });

playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.classList.remove("fa-music");
        playBtn.classList.add("fa-pause");
    } else {
        audio.pause();
        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("fa-music");
    }
});

volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});
