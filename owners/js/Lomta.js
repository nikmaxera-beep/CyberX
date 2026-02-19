document.addEventListener("DOMContentLoaded", function () {

    const audio = document.getElementById("bg-music");
    const video = document.getElementById("bg-video");
    const volumeSlider = document.getElementById("volume-slider");
    const volumeIcon = document.getElementById("volume-icon");
    const enterScreen = document.getElementById("enter-screen");

    let lastVolume = 0.5; // remember previous volume

    // ===== START EXPERIENCE =====
    function startExperience() {
        if (audio) audio.play().catch(() => {});
        if (video) video.play().catch(() => {});

        if (enterScreen) {
            enterScreen.style.opacity = "0";
            setTimeout(() => {
                enterScreen.style.display = "none";
            }, 700);
        }
    }

    if (enterScreen) enterScreen.addEventListener("click", startExperience);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") startExperience();
    });

    // ===== INITIAL VOLUME =====
    if (audio && volumeSlider) {
        const v = volumeSlider.value / 100;
        audio.volume = v;
        lastVolume = v;
        updateVolumeIcon(v);
        volumeSlider.style.setProperty("--vol", volumeSlider.value + "%");
    }

    // ===== VOLUME SLIDER =====
    if (volumeSlider && audio) {
        volumeSlider.addEventListener("input", function () {
            const v = this.value / 100;

            audio.volume = v;
            audio.muted = v === 0;

            if (v > 0) lastVolume = v;

            this.style.setProperty("--vol", this.value + "%");
            updateVolumeIcon(v);
        });
    }

    // ===== ICON CLICK (MUTE / UNMUTE) =====
    if (volumeIcon && audio && volumeSlider) {
        volumeIcon.addEventListener("click", () => {

            if (!audio.muted && audio.volume > 0) {
                // mute
                lastVolume = audio.volume;
                audio.muted = true;
                audio.volume = 0;
                volumeSlider.value = 0;
                volumeSlider.style.setProperty("--vol", "0%");
                updateVolumeIcon(0);

            } else {
                // restore
                audio.muted = false;
                audio.volume = lastVolume || 0.5;
                volumeSlider.value = audio.volume * 100;
                volumeSlider.style.setProperty("--vol", volumeSlider.value + "%");
                updateVolumeIcon(audio.volume);
            }

        });
    }

    // ===== ICON STATE =====
    function updateVolumeIcon(v) {
        if (!volumeIcon) return;

        if (v === 0) volumeIcon.textContent = "🔇";
        else if (v < 0.5) volumeIcon.textContent = "🔉";
        else volumeIcon.textContent = "🔊";
    }

});
