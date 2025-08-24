// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const colors = ['#2584f8', '#04ddb2', '#a4caff', '#f2f6fc'];

const particles = [];
const particleCount = 100;
const maxDistance = 140;

// Crear partículas con propiedades extra
for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random(),
        delta: Math.random() * 0.02
    });
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    // Dibujar partículas
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Rebote en los bordes
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Parpadeo de partículas
        p.alpha += p.delta;
        if (p.alpha <= 0 || p.alpha >= 1) p.delta *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(p.color)},${p.alpha})`;
        ctx.fill();
    });

    // Dibujar líneas entre partículas cercanas
    for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                const alpha = 0.5 * (1 - dist / maxDistance);
                ctx.strokeStyle = `rgba(37, 221, 178, ${alpha})`;
                ctx.lineWidth = 0.7;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}

// Convertir hex a rgb
function hexToRgb(hex) {
    const bigint = parseInt(hex.replace('#',''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
}

animate();

// Ajustar canvas al redimensionar
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});
