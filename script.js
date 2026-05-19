const pageFiles = {
    'home':         'home.html',
    'about':        'about.html',
    'stack':        'stack.html',
    'certificates': 'certificates.html'
};

const pageNames = Object.keys(pageFiles);

async function showPage(pageName) {
    if (!pageFiles[pageName]) pageName = 'home';

    const container = document.getElementById('content-area');
    if (!container) return;

    // Update nav active state
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-yellow-400', 'bg-white/5');
        btn.classList.add('text-gray-500');
    });
    const activeBtn = document.getElementById('nav-' + pageName);
    if (activeBtn) {
        activeBtn.classList.add('text-yellow-400', 'bg-white/5');
        activeBtn.classList.remove('text-gray-500');
    }

    // Save page so refresh restores it
    sessionStorage.setItem('currentPage', pageName);

    try {
        const response = await fetch(pageFiles[pageName]);
        if (!response.ok) throw new Error('Not found');

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extract just the <section> content — no nav, no duplicate body
        const section = doc.querySelector('section') || doc.querySelector('main') || doc.body;
        container.innerHTML = section.outerHTML;
        window.scrollTo(0, 0);

        // Re-run inline scripts (for Anime.js animations)
        container.querySelectorAll('script').forEach(old => {
            const s = document.createElement('script');
            if (old.src) { s.src = old.src; s.async = false; }
            else { s.textContent = old.textContent; }
            document.body.appendChild(s);
            old.remove();
        });

    } catch (err) {
        console.error(err);
        container.innerHTML = `
            <div class="w-full min-h-screen flex items-center justify-center text-white p-20">
                <div class="text-center">
                    <h2 class="text-2xl font-bold mb-2 text-yellow-400">Page Error</h2>
                    <p class="text-white/70">Make sure you're running on Live Server.</p>
                    <button onclick="showPage('home')" class="mt-4 px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg">Go Home</button>
                </div>
            </div>`;
    }
}

window.showPage = showPage;

document.addEventListener('DOMContentLoaded', () => {
    const saved = sessionStorage.getItem('currentPage') || 'home';
    showPage(saved);
});