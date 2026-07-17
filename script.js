/* ─── Active nav link highlight ─── */
document.querySelectorAll('.nav-btn').forEach(btn => {
    if (btn.getAttribute('href') === window.location.pathname.split('/').pop()) {
        btn.classList.add('active');
    }
});

/* ─── Cursor glow trail ─── */
const glow = document.createElement('div');
glow.classList.add('cursor-glow');
document.body.appendChild(glow);
document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
});

/* ─── Scroll reveal for any .reveal elements ─── */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── Home page animations ─── */
if (document.querySelector('.profile-wrapper')) {
    anime({ targets: '.profile-wrapper', opacity: [0,1], scale: [0.8,1], duration: 1400, easing: 'easeOutExpo' });
    anime({ targets: '.hero-text > *', opacity: [0,1], translateY: [40,0], delay: anime.stagger(180,{start:300}), duration: 1200, easing: 'easeOutExpo' });
}

/* ─── About page animations ─── */
if (document.querySelector('.about-left')) {
    anime({ targets: '.about-left',  opacity: [0,1], translateX: [-40,0], duration: 1200, easing: 'easeOutExpo' });
    anime({ targets: '.about-right', opacity: [0,1], translateX: [40,0],  duration: 1200, delay: 200, easing: 'easeOutExpo' });
    anime({ targets: '.about-tag',   opacity: [0,1], translateY: [20,0],  delay: anime.stagger(120,{start:500}), duration: 700, easing: 'easeOutExpo' });
    anime({ targets: '.info-card',   opacity: [0,1], translateY: [25,0],  delay: anime.stagger(150,{start:700}), duration: 800, easing: 'easeOutExpo' });
}

/* ─── Tech Stack page animations ─── */
if (document.querySelector('.stack-header')) {
    anime({ targets: '.stack-header', opacity: [0,1], translateY: [40,0], delay: anime.stagger(120), duration: 1000, easing: 'easeOutExpo' });
    anime({ targets: '.stack-item',   opacity: [0,1], translateY: [40,0], scale: [0.9,1], delay: anime.stagger(100,{start:400}), duration: 900, easing: 'easeOutExpo' });
}

/* ─── Certificates page animations ─── */
if (document.querySelector('.cert-header')) {
    anime({ targets: '.cert-header', opacity: [0,1], translateY: [40,0], delay: anime.stagger(120), duration: 900, easing: 'easeOutExpo' });
    anime({ targets: '.cert-card',   opacity: [0,1], translateY: [60,0], delay: anime.stagger(180,{start:400}), duration: 900, easing: 'easeOutExpo' });
}

/* ─── Certificate modal ─── */
if (document.getElementById('cert-modal')) {
    window.openModal = function(imgSrc, title, link) {
        document.getElementById('modal-img').src = imgSrc;
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-link').href = link;
        document.getElementById('cert-modal').classList.add('open');
        anime({ targets: '.modal-box', opacity: [0,1], scale: [0.9,1], duration: 400, easing: 'easeOutExpo' });
    };
    window.closeModal = function() {
        document.getElementById('cert-modal').classList.remove('open');
    };
    document.getElementById('cert-modal').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}