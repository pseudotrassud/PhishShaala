// Hero content floats up and fades as user scrolls — keeps it from competing with page sections
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.getElementById('hero-content');
    if (heroContent) {
        const rate = scrolled * 0.4;
        const safeScale = Math.max(0.8, 1 - scrolled * 0.0005);
        const safeOpacity = Math.max(0, 1 - scrolled * 0.002);
        heroContent.style.transform = `translateY(${rate}px) scale(${safeScale})`;
        heroContent.style.opacity = safeOpacity;
    }
});

// Animate cards when they enter the viewport (runs once per element)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

// Interactive particle canvas — node color flips with theme toggle
(function () {
    const canvas = document.getElementById('cyber-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const NODE_COUNT = 70;
    const CONNECT_DIST = 140;
    const CURSOR_REPEL = 110;
    const REPEL_FORCE = 0.28;
    const SPEED = 0.35;

    let mouse = { x: -9999, y: -9999 };
    let nodes = [];
    let W, H;

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        W = canvas.width = rect.width;
        H = canvas.height = rect.height;
    }

    const isDark = () => document.documentElement.classList.contains('dark');
    const nodeColor = alpha => isDark() ? `rgba(255,107,107,${alpha})` : `rgba(99,102,241,${alpha})`;
    const lineColor = alpha => isDark() ? `rgba(120,160,255,${alpha})` : `rgba(99,102,241,${alpha})`;

    function makeNode() {
        const angle = Math.random() * Math.PI * 2;
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            vx: Math.cos(angle) * SPEED * (0.4 + Math.random() * 0.6),
            vy: Math.sin(angle) * SPEED * (0.4 + Math.random() * 0.6),
            r: 1 + Math.random() * 1.5,
        };
    }

    function init() {
        resize();
        nodes = Array.from({ length: NODE_COUNT }, makeNode);
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        nodes.forEach(n => {
            const dx = n.x - mouse.x, dy = n.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Push node away from cursor
            if (dist < CURSOR_REPEL && dist > 0) {
                const force = (CURSOR_REPEL - dist) / CURSOR_REPEL * REPEL_FORCE;
                n.vx += (dx / dist) * force;
                n.vy += (dy / dist) * force;
            }

            n.vx *= 0.985;
            n.vy *= 0.985;

            // Keep nodes drifting — clamp speed
            const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
            if (speed < SPEED * 0.4 && speed > 0) { const r = (SPEED * 0.4) / speed; n.vx *= r; n.vy *= r; }
            if (speed > SPEED * 1.8) { n.vx = (n.vx / speed) * SPEED * 1.8; n.vy = (n.vy / speed) * SPEED * 1.8; }

            n.x += n.vx; n.y += n.vy;
            if (n.x < 0) { n.x = 0; n.vx *= -1; }
            if (n.x > W) { n.x = W; n.vx *= -1; }
            if (n.y < 0) { n.y = 0; n.vy *= -1; }
            if (n.y > H) { n.y = H; n.vy *= -1; }
        });

        // Draw connecting lines between nearby nodes
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const a = nodes[i], b = nodes[j];
                const d = Math.hypot(a.x - b.x, a.y - b.y);
                if (d < CONNECT_DIST) {
                    const nearCursor = Math.min(Math.hypot(a.x - mouse.x, a.y - mouse.y), Math.hypot(b.x - mouse.x, b.y - mouse.y)) < CURSOR_REPEL * 1.5;
                    const alpha = (1 - d / CONNECT_DIST) * (nearCursor ? 0.55 : 0.18);
                    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = lineColor(alpha); ctx.lineWidth = nearCursor ? 1.2 : 0.6; ctx.stroke();
                }
            }
        }

        nodes.forEach(n => {
            const near = Math.hypot(n.x - mouse.x, n.y - mouse.y) < CURSOR_REPEL * 1.5;
            ctx.beginPath(); ctx.arc(n.x, n.y, n.r * (near ? 1.6 : 1), 0, Math.PI * 2);
            ctx.fillStyle = nodeColor(near ? 0.85 : 0.45); ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    window.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
    window.addEventListener('resize', resize);

    init();
    draw();
})();
