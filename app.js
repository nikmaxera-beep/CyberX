const music = document.getElementById("bg-music");
const slider = document.getElementById("volume-slider");
const icon = document.getElementById("volume-icon");
const enterScreen = document.getElementById("enter-screen");

// წამოვიღოთ შენახული მონაცემები
let savedVolume = localStorage.getItem("musicVolume");
let isMuted = localStorage.getItem("musicMuted") === "true";

// მთავარი ლოგიკა: თუ ხმა 0 იყო ან დამიუტებული, დავაყენოთ 0.1 (10%)
if (savedVolume === null || parseFloat(savedVolume) <= 0 || isMuted) {
    savedVolume = 0.1; 
    isMuted = false; // მოვხსნათ დამიუტება
} else {
    savedVolume = parseFloat(savedVolume);
}

// მნიშვნელობების მინიჭება
music.volume = savedVolume;
slider.value = savedVolume * 100;
music.muted = isMuted;

function updateIcon() {
    if (music.muted || music.volume === 0) {
        icon.classList.replace("fa-volume-up", "fa-volume-mute");
    } else {
        icon.classList.replace("fa-volume-mute", "fa-volume-up");
    }
}

updateIcon();

enterScreen.addEventListener("click", () => {
    // აქაც დავაზღვიოთ: თუ play-მდე რამენაირად muted აღმოჩნდა, მოვხსნათ
    if (music.volume <= 0) {
        music.volume = 0.1;
        slider.value = 10;
    }
    music.muted = false;
    
    music.play().catch(() => console.log("Music play blocked"));
    enterScreen.style.opacity = "0";
    setTimeout(() => { enterScreen.style.display = "none"; }, 600);
    updateIcon();
});

slider.addEventListener("input", (e) => {
    let val = e.target.value / 100;
    music.volume = val;
    music.muted = (val === 0);
    localStorage.setItem("musicVolume", val);
    localStorage.setItem("musicMuted", music.muted);
    updateIcon();
});

icon.addEventListener("click", () => {
    music.muted = !music.muted;
    localStorage.setItem("musicMuted", music.muted);
    
    // თუ ხმას ვრთავთ (unmute) და ხმა 0-ზეა, ავტომატურად ავუწიოთ 10%-ზე
    if (!music.muted && music.volume === 0) {
        music.volume = 0.1;
        localStorage.setItem("musicVolume", 0.1);
    }
    
    slider.value = music.muted ? 0 : music.volume * 100;
    updateIcon();
});

  (function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.");}var ch=function(){ch.c(arguments);};ch.q=[];ch.c=function(args){ch.q.push(args);};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return;}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x);}}if(document.readyState==="complete"){l();}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l);}})();

  ChannelIO('boot', {
    "pluginKey": "47765762-7a90-49f8-bb95-45060c80d045"
  });
