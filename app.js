const music = document.getElementById("bg-music");
const slider = document.getElementById("volume-slider");
const icon = document.getElementById("volume-icon");
const enterScreen = document.getElementById("enter-screen");
const video = document.getElementById("bg-video");

// --- MUSIC & START LOGIC ---
let savedVolume = localStorage.getItem("musicVolume") || 0.1;
music.volume = parseFloat(savedVolume);
slider.value = music.volume * 100;

function updateIcon() {
    icon.className = (music.muted || music.volume === 0) ? "fas fa-volume-mute" : "fas fa-volume-up";
}

enterScreen.addEventListener("click", () => {
    music.muted = false;
    music.play().catch(() => console.log("Music blocked"));
    // Start video only after click to save initial load resources
    video.src = video.querySelector('source').src;
    video.load();
    
    enterScreen.style.opacity = "0";
    setTimeout(() => { enterScreen.style.display = "none"; }, 800);
    updateIcon();
});

slider.addEventListener("input", (e) => {
    let val = e.target.value / 100;
    music.volume = val;
    music.muted = (val === 0);
    localStorage.setItem("musicVolume", val);
    updateIcon();
});

// --- OPTIMIZED STARFIELD LOGIC ---
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let stars = [];
const numStars = 200; // REDUCED for performance
const speed = 4;

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Star {
    constructor() { this.reset(); }
    reset() {
        this.x = (Math.random() - 0.5) * canvas.width;
        this.y = (Math.random() - 0.5) * canvas.height;
        this.z = Math.random() * canvas.width;
    }
    update() {
        this.z -= speed;
        if (this.z <= 1) this.reset();
    }
    show() {
        let sx = (this.x / this.z) * (canvas.width / 2) + canvas.width / 2;
        let sy = (this.y / this.z) * (canvas.height / 2) + canvas.height / 2;
        let r = (1 - this.z / canvas.width) * 3;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fill();
    }
}

for (let i = 0; i < numStars; i++) stars.push(new Star());

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
    }
    requestAnimationFrame(drawStars);
}

window.addEventListener("resize", () => {
    setupCanvas();
});
setupCanvas();
drawStars();

// --- DELAYED LOADING FOR CHANNEL IO (Increases Performance Score) ---
function loadChannelIO() {
    (function(){var w=window;if(w.ChannelIO){return;}var ch=function(){ch.c(arguments);};ch.q=[];ch.c=function(args){ch.q.push(args);};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return;}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x);}}if(document.readyState==="complete"){l();}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l);}})();
    ChannelIO('boot', { "pluginKey": "47765762-7a90-49f8-bb95-45060c80d045" });
}

// Load ChannelIO after 3 seconds of idle time
window.addEventListener('load', () => {
    setTimeout(loadChannelIO, 3000);
});