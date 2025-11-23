// Navbar smooth scroll and section highlight
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Remove highlight from all, then add to target
                    document.querySelectorAll('.about, .projects, .skills, .contact').forEach(sec => sec.classList.remove('section-highlight'));
                    setTimeout(() => {
                        target.classList.add('section-highlight');
                        setTimeout(() => target.classList.remove('section-highlight'), 1300);
                    }, 400);
                }
            }
        });
    });
});
// Animated Glassmorphic Navbar with Scroll-triggered Appearance and Scrollspy
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('main-navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = [
        {id: 'about', el: document.querySelector('.about')},
        {id: 'projects', el: document.querySelector('.projects')},
        {id: 'skills', el: document.querySelector('.skills')},
        {id: 'contact', el: document.querySelector('.contact')}
    ];
    function onScroll() {
        const scrollY = window.scrollY || window.pageYOffset;
        // Show navbar after scrolling 80px
        if (scrollY > 80) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
        // Scrollspy highlight
        let current = '';
        for (let s of sections) {
            if (s.el && s.el.offsetTop - 120 <= scrollY) {
                current = s.id;
            }
        }
        navLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
});
// Light Mode Animated Geometric Background - FABULOUS VERSION
(function() {
    const canvas = document.getElementById('lightmode-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth, h = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    function resize() {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(1,0,0,1,0,0);
        ctx.scale(dpr, dpr);
    }
    window.addEventListener('resize', resize);
    resize();
    // Geometric shapes
    const SHAPE_COUNT = 18;
    const shapes = Array.from({length: SHAPE_COUNT}, (_,i) => {
        const type = ['circle','triangle','square'][Math.floor(Math.random()*3)];
        return {
            type,
            x: Math.random()*w,
            y: Math.random()*h,
            r: 32+Math.random()*38,
            angle: Math.random()*Math.PI*2,
            speed: 0.12+Math.random()*0.08,
            rotSpeed: 0.003+Math.random()*0.004,
            color: [
                'rgba(166,200,255,0.18)',
                'rgba(255,200,220,0.18)',
                'rgba(200,255,220,0.18)',
                'rgba(255,240,180,0.18)',
                'rgba(180,220,255,0.18)',
                'rgba(255,220,200,0.18)'
            ][Math.floor(Math.random()*6)],
            neon: [
                '#a6c8ff', '#ffb3e6', '#baffc9', '#ffe29a', '#b3d1ff', '#ffd6b3'
            ][Math.floor(Math.random()*6)]
        };
    });
    // Sparkles
    const SPARKLE_COUNT = 32;
    const sparkles = Array.from({length: SPARKLE_COUNT}, () => ({
        x: Math.random()*w,
        y: Math.random()*h,
        r: 0.8+Math.random()*1.8,
        t: Math.random()*1000,
        speed: 0.2+Math.random()*0.2
    }));
    // Parallax mouse
    let mouse = {x: w/2, y: h/2};
    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    function drawBgGrad(t) {
        // Iridescent animated gradient
        const grad = ctx.createLinearGradient(0,0,w,h);
        grad.addColorStop(0,`hsl(${200+Math.sin(t/900)*40},100%,98%)`);
        grad.addColorStop(0.4,`hsl(${260+Math.cos(t/700)*60},100%,95%)`);
        grad.addColorStop(0.7,`hsl(${320+Math.sin(t/500)*60},100%,92%)`);
        grad.addColorStop(1,`hsl(${180+Math.cos(t/1100)*60},100%,97%)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0,0,w,h);
    }
    function drawShapes(t) {
        for (let s of shapes) {
            ctx.save();
            // Parallax
            let px = (s.x + (mouse.x-w/2)*0.04*(0.5+Math.sin(t+s.x/200)));
            let py = (s.y + (mouse.y-h/2)*0.04*(0.5+Math.cos(t+s.y/200)));
            ctx.translate(px, py);
            ctx.rotate(s.angle + Math.sin(t/2)*0.1);
            ctx.globalAlpha = 0.7 + 0.3*Math.sin(t+s.x/200);
            // Neon glow
            ctx.shadowColor = s.neon;
            ctx.shadowBlur = 32;
            // Fill
            ctx.fillStyle = s.color;
            if (s.type==='circle') {
                ctx.beginPath();
                ctx.arc(0,0,s.r,0,2*Math.PI);
                ctx.fill();
                // Neon outline
                ctx.lineWidth = 3.5;
                ctx.strokeStyle = s.neon;
                ctx.shadowBlur = 18;
                ctx.globalAlpha *= 0.7;
                ctx.stroke();
            } else if (s.type==='triangle') {
                ctx.beginPath();
                ctx.moveTo(0,-s.r);
                ctx.lineTo(s.r*Math.sin(Math.PI/3),s.r*Math.cos(Math.PI/3));
                ctx.lineTo(-s.r*Math.sin(Math.PI/3),s.r*Math.cos(Math.PI/3));
                ctx.closePath();
                ctx.fill();
                ctx.lineWidth = 3.5;
                ctx.strokeStyle = s.neon;
                ctx.shadowBlur = 18;
                ctx.globalAlpha *= 0.7;
                ctx.stroke();
            } else if (s.type==='square') {
                ctx.beginPath();
                ctx.rect(-s.r*0.8,-s.r*0.8,s.r*1.6,s.r*1.6);
                ctx.fill();
                ctx.lineWidth = 3.5;
                ctx.strokeStyle = s.neon;
                ctx.shadowBlur = 18;
                ctx.globalAlpha *= 0.7;
                ctx.stroke();
            }
            ctx.restore();
        }
    }
    function drawSparkles(t) {
        for (let s of sparkles) {
            let tw = 0.7 + 0.5*Math.sin(t*1.5 + s.t);
            ctx.save();
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r*tw, 0, 2*Math.PI);
            ctx.fillStyle = `rgba(255,255,255,${0.18+0.22*tw})`;
            ctx.shadowColor = '#fff8';
            ctx.shadowBlur = 16+8*tw;
            ctx.globalAlpha = 0.7+0.3*tw;
            ctx.fill();
            ctx.restore();
        }
    }
    function updateShapes() {
        for (let s of shapes) {
            s.y += Math.sin(s.angle)*s.speed + 0.12;
            s.x += Math.cos(s.angle)*s.speed;
            s.angle += s.rotSpeed;
            if (s.y > h+80) s.y = -80;
            if (s.x > w+80) s.x = -80;
            if (s.x < -80) s.x = w+80;
        }
        for (let s of sparkles) {
            s.y += s.speed;
            if (s.y > h+10) {
                s.y = -10;
                s.x = Math.random()*w;
            }
        }
    }
    function animate(t) {
        if (!document.body.classList.contains('dark-mode')) {
            drawBgGrad(t);
            updateShapes();
            drawShapes(t/600);
            drawSparkles(t/400);
        } else {
            ctx.clearRect(0,0,w,h);
        }
        requestAnimationFrame(animate);
    }
    animate(0);
})();
// Interactive Constellation Network Background
(function() {
    const canvas = document.getElementById('constellation-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth, h = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    function resize() {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(1,0,0,1,0,0);
        ctx.scale(dpr, dpr);
    }
    window.addEventListener('resize', resize);
    resize();
    // Constellation parameters
    const STAR_COUNT = 56;
    const stars = Array.from({length: STAR_COUNT}, () => ({
        x: Math.random()*w,
        y: Math.random()*h,
        vx: (Math.random()-0.5)*0.22,
        vy: (Math.random()-0.5)*0.22,
        r: 1.2 + Math.random()*1.8
    }));
    let mouse = {x: w/2, y: h/2, active: false};
    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
    });
    window.addEventListener('mouseleave', () => { mouse.active = false; });
    function draw() {
        ctx.clearRect(0,0,w,h);
        // Draw lines
        for (let i=0; i<STAR_COUNT; i++) {
            for (let j=i+1; j<STAR_COUNT; j++) {
                const a = stars[i], b = stars[j];
                const dx = a.x-b.x, dy = a.y-b.y;
                const dist = Math.sqrt(dx*dx+dy*dy);
                if (dist < 120) {
                    ctx.save();
                    ctx.globalAlpha = 0.13 + 0.09*(1-dist/120);
                    ctx.strokeStyle = '#a6c8ff';
                    ctx.lineWidth = 1.1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
        // Draw lines to mouse
        if (mouse.active) {
            for (let i=0; i<STAR_COUNT; i++) {
                const a = stars[i];
                const dx = a.x-mouse.x, dy = a.y-mouse.y;
                const dist = Math.sqrt(dx*dx+dy*dy);
                if (dist < 140) {
                    ctx.save();
                    ctx.globalAlpha = 0.18 + 0.12*(1-dist/140);
                    ctx.strokeStyle = '#00f0ff';
                    ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
        // Draw stars
        for (let i=0; i<STAR_COUNT; i++) {
            const s = stars[i];
            ctx.save();
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, 2*Math.PI);
            ctx.fillStyle = '#fff';
            ctx.shadowColor = '#a6c8ff';
            ctx.shadowBlur = 8;
            ctx.globalAlpha = 0.7;
            ctx.fill();
            ctx.restore();
        }
    }
    function update() {
        for (let i=0; i<STAR_COUNT; i++) {
            let s = stars[i];
            s.x += s.vx;
            s.y += s.vy;
            if (s.x < 0 || s.x > w) s.vx *= -1;
            if (s.y < 0 || s.y > h) s.vy *= -1;
        }
    }
    function animate() {
        update();
        draw();
        requestAnimationFrame(animate);
    }
    animate();
})();

// main.js - Adds smooth transitions and simple interactivity

document.addEventListener('DOMContentLoaded', function() {
    // Page fade-in transition
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 30);

    // Page fade-out on navigation
    document.querySelectorAll('a[href]:not([target])').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
                e.preventDefault();
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location = href;
                }, 500);
            }
        });
    });
    // Fade in effect for hero and sections
    const fadeEls = document.querySelectorAll('.hero, section, footer');
    fadeEls.forEach(el => {
        el.classList.add('fade-in');
    });

    // Animated Floating Realistic Icarus
    const icarus = document.getElementById('icarus-bg');
    if (icarus) {
        let t = 0;
        function animateIcarus() {
            t += 0.014;
            // Floating up and down
            const floatY = Math.sin(t) * 32;
            // Gentle rotation
            const rot = Math.sin(t/2) * 8;
            // Horizontal drifting
            const driftX = Math.cos(t/1.7) * 28;
            icarus.style.transform = `translateY(${floatY}px) translateX(${driftX}px) rotate(${rot}deg)`;
            requestAnimationFrame(animateIcarus);
        }
        animateIcarus();
    }

    // Animated floating and rotation for profile image
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        let t = 0;
        function animateProfile() {
            t += 0.016;
            const floatY = Math.sin(t) * 10;
            const rot = Math.sin(t/2) * 3;
            profileImg.style.transform = `translateY(${floatY}px) rotate(${rot}deg)`;
            requestAnimationFrame(animateProfile);
        }
        animateProfile();
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Button ripple effect
    document.querySelectorAll('.cta-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const circle = document.createElement('span');
            circle.className = 'ripple';
            circle.style.left = e.offsetX + 'px';
            circle.style.top = e.offsetY + 'px';
            this.appendChild(circle);
            setTimeout(() => circle.remove(), 600);
        });
    });

    // Dark mode toggle logic
    const toggleBtn = document.getElementById('darkmode-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkmode');
    function setDarkMode(on) {
        document.body.classList.toggle('dark-mode', on);
        toggleBtn.textContent = on ? '☀️' : '🌙';
    }
    // Initial mode
    if (savedMode === 'dark' || (!savedMode && prefersDark)) {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }
    toggleBtn.addEventListener('click', function() {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkmode', isDark ? 'dark' : 'light');
        toggleBtn.textContent = isDark ? '☀️' : '🌙';
    });
});

// Holographic Portal Effect - Goosebump Sci-Fi Centerpiece
    (function() {
        const canvas = document.getElementById('holo-portal');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width, h = canvas.height;
        let mouse = { x: w/2, y: h/2 };
        let t = 0;
        // Swirling particles
        const PARTICLE_COUNT = 64;
        const particles = Array.from({length: PARTICLE_COUNT}, (_,i) => ({
            angle: Math.random()*2*Math.PI,
            radius: 70 + Math.random()*40,
            speed: 0.008 + Math.random()*0.012,
            size: 2.2 + Math.random()*2.2,
            color: `hsla(${180+Math.random()*80},100%,70%,0.7)`
        }));
        // Portal glow
        function drawPortal(cx, cy, r, t) {
            for (let i=0; i<6; i++) {
                ctx.save();
                ctx.globalAlpha = 0.18 + 0.08*Math.sin(t/1.7+i);
                ctx.beginPath();
                ctx.arc(cx, cy, r+8+8*i+Math.sin(t/1.2+i)*2, 0, 2*Math.PI);
                ctx.strokeStyle = `hsl(${180+20*i},100%,${60+10*i}% )`;
                ctx.lineWidth = 8-1.1*i;
                ctx.shadowColor = `#00f0ff`;
                ctx.shadowBlur = 32-4*i;
                ctx.stroke();
                ctx.restore();
            }
            // Core
            ctx.save();
            ctx.globalAlpha = 0.22;
            ctx.beginPath();
            ctx.arc(cx, cy, r-8+Math.sin(t/2)*2, 0, 2*Math.PI);
            ctx.fillStyle = 'rgba(0,255,255,0.18)';
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 32;
            ctx.fill();
            ctx.restore();
        }
        // Swirling particles
        function drawParticles(cx, cy, t) {
            for (let p of particles) {
                let a = p.angle + t*p.speed*2 + Math.sin(t/2+p.radius)*0.2;
                let r = p.radius + Math.sin(t/1.5+p.radius)*6;
                let x = cx + Math.cos(a)*r;
                let y = cy + Math.sin(a)*r;
                ctx.save();
                ctx.beginPath();
                ctx.arc(x, y, p.size + Math.sin(t*2+p.radius)*0.7, 0, 2*Math.PI);
                ctx.fillStyle = p.color;
                ctx.shadowColor = '#00f0ff';
                ctx.shadowBlur = 12;
                ctx.globalAlpha = 0.7 + 0.3*Math.sin(t*2+p.radius);
                ctx.fill();
                ctx.restore();
            }
        }
        // Light rays
        function drawRays(cx, cy, t) {
            for (let i=0; i<16; i++) {
                let a = t*0.5 + i*Math.PI/8 + Math.sin(t/2+i)*0.2;
                let r1 = 80 + Math.sin(t/1.3+i)*8;
                let r2 = 120 + Math.cos(t/1.7+i)*12;
                let x1 = cx + Math.cos(a)*r1;
                let y1 = cy + Math.sin(a)*r1;
                let x2 = cx + Math.cos(a)*r2;
                let y2 = cy + Math.sin(a)*r2;
                ctx.save();
                ctx.globalAlpha = 0.13 + 0.07*Math.sin(t+i);
                ctx.strokeStyle = `hsl(${180+30*i},100%,70%)`;
                ctx.lineWidth = 2.2;
                ctx.shadowColor = '#00f0ff';
                ctx.shadowBlur = 16;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                ctx.restore();
            }
        }
        // Mouse interaction
        canvas.addEventListener('mousemove', e => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        canvas.addEventListener('mouseleave', () => {
            mouse.x = w/2; mouse.y = h/2;
        });
        function animate() {
            t += 0.016;
            ctx.clearRect(0,0,w,h);
            // Portal center follows mouse with spring
            let cx = w/2 + (mouse.x-w/2)*0.22;
            let cy = h/2 + (mouse.y-h/2)*0.22;
            // Draw rays
            drawRays(cx, cy, t);
            // Draw portal
            drawPortal(cx, cy, 80, t);
            // Draw swirling particles
            drawParticles(cx, cy, t);
            // Subtle glow
            ctx.save();
            ctx.globalAlpha = 0.18 + 0.08*Math.sin(t);
            ctx.beginPath();
            ctx.arc(cx, cy, 100+Math.sin(t/2)*6, 0, 2*Math.PI);
            ctx.fillStyle = 'rgba(0,255,255,0.13)';
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 48;
            ctx.fill();
            ctx.restore();
            requestAnimationFrame(animate);
        }
        animate();
    })();

    // Interactive 3D Parallax Starfield
        const canvas = document.getElementById('starfield-bg');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let w = window.innerWidth, h = window.innerHeight;
            let dpr = window.devicePixelRatio || 1;
            let stars = [];
            const STAR_COUNT = 160;
            function resize() {
                w = window.innerWidth; h = window.innerHeight;
                canvas.width = w * dpr; canvas.height = h * dpr;
                canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
                ctx.setTransform(1,0,0,1,0,0);
                ctx.scale(dpr, dpr);
            }
            function randomStar() {
                const depth = Math.random() * 1.2 + 0.2;
                return {
                    x: Math.random() * w,
                    y: Math.random() * h,
                    z: depth,
                    r: Math.random() * 1.2 + 0.5,
                    o: Math.random() * 0.5 + 0.5,
                    tw: Math.random() * 360
                };
            }
            function createStars() {
                stars = [];
                for (let i = 0; i < STAR_COUNT; i++) stars.push(randomStar());
            }
            let mouse = {x: w/2, y: h/2};
            window.addEventListener('mousemove', e => {
                mouse.x = e.clientX; mouse.y = e.clientY;
            });
            window.addEventListener('resize', () => { resize(); createStars(); });
            function draw() {
                ctx.clearRect(0,0,w,h);
                for (let s of stars) {
                    // Parallax
                    let px = s.x + (mouse.x-w/2)*0.08*s.z;
                    let py = s.y + (mouse.y-h/2)*0.08*s.z;
                    // Twinkle
                    let tw = 0.7 + 0.3*Math.sin(Date.now()/600 + s.tw);
                    ctx.beginPath();
                    ctx.arc(px, py, s.r*tw, 0, 2*Math.PI);
                    ctx.fillStyle = `rgba(166,200,255,${0.18*s.z + 0.18*tw + s.o*0.2})`;
                    ctx.shadowColor = '#a6c8ff';
                    ctx.shadowBlur = 16*s.z;
                    ctx.fill();
                }
                ctx.shadowBlur = 0;
                requestAnimationFrame(draw);
            }
            resize();
            createStars();
            draw();
        }

        // 3D Cube Interactive Rotation (fixed position)
    (function() {
        const cube = document.getElementById('cube3d');
        if (!cube) return;
        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;
        let currentX = 20, currentY = -20;
        function animate() {
            currentX += (targetX - currentX) * 0.08;
            currentY += (targetY - currentY) * 0.08;
            cube.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
            requestAnimationFrame(animate);
        }
        animate();
        document.addEventListener('mousemove', e => {
            const w = window.innerWidth, h = window.innerHeight;
            mouseX = (e.clientX / w - 0.5) * 2;
            mouseY = (e.clientY / h - 0.5) * 2;
            targetY = mouseX * 60;
            targetX = -mouseY * 60;
        });
    })();

