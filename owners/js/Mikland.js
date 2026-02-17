// 1. Splash Screen
const enterBtn = document.getElementById('enter-btn');
const introScreen = document.getElementById('intro-screen');
const mainContent = document.getElementById('main-content');

enterBtn.addEventListener('click', () => {
    introScreen.style.opacity = '0';
    setTimeout(() => {
        introScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
        mainContent.classList.add('show');
    }, 800);
});

// 2. Theme Toggler
const checkbox = document.getElementById('checkbox');
checkbox.addEventListener('change', () => {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
});

// 3. Particles (თეთრი ბურთულები)
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.spX = (Math.random() - 0.5) * 0.6;
        this.spY = (Math.random() - 0.5) * 0.6;
    }
    update() {
        this.x += this.spX;
        this.y += this.spY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }
    draw() {
        ctx.fillStyle = '#ffffff'; // თეთრი ფერი
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 70; i++) particles.push(new Particle());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
animate();

// 4. Scroll Reveal
window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal-scroll').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 150) el.classList.add('active');
    });
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});