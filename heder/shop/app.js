/* ========================= */
/* STARFIELD LOGIC */
/* ========================= */
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let stars = [];
const numStars = 800;
const speed = 5;

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
        let r = (1 - this.z / canvas.width) * 4;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    }
}

for (let i = 0; i < numStars; i++) stars.push(new Star());

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.show();
    });
    requestAnimationFrame(drawStars);
}

window.addEventListener("resize", setupCanvas);
setupCanvas();
drawStars();

/* ========================= */
/* BUY POPUP LOGIC */
/* ========================= */
const buyPopup = document.getElementById("buy-popup");
const buyButtons = document.querySelectorAll(".buy-btn");

buyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (!btn.closest('.disabled-card')) {
            buyPopup.style.display = "flex";
        }
    });
});

function closePopup() {
    buyPopup.style.display = "none";
}

window.addEventListener("click", (e) => {
    if (e.target === buyPopup) closePopup();
});

/* ========================= */
/* CHANNEL IO */
/* ========================= */
(function(){var w=window;if(w.ChannelIO){return;}var ch=function(){ch.c(arguments);};ch.q=[];ch.c=function(args){ch.q.push(args);};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return;}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x);}}if(document.readyState==="complete"){l();}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l);}})();
ChannelIO('boot', { "pluginKey": "47765762-7a90-49f8-bb95-45060c80d045" });