const pageFiles = {
    'home': '/home.html',
    'about': '/about.html',
    'stack': '/stack.html',
    'certificates': '/certificates.html'
};

// Pages in order for clean URL matching
const pageNames = Object.keys(pageFiles);

async function showPage(pageName) {
    if (!pageFiles[pageName]) pageName = 'home';

    const container = document.getElementById('content-area');
    if (!container) return;

    // Clean URL — no # symbol, uses browser history
    const cleanPath = window.location.pathname.replace(/\/[^/]*$/, '/') + (pageName === 'home' ? '' : pageName);
    history.pushState({ page: pageName }, '', cleanPath);

    // Update active nav styles
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-yellow-400', 'bg-white/5');
        btn.classList.add('text-gray-500');
    });

    const activeBtn = document.getElementById('nav-' + pageName);
    if (activeBtn) {
        activeBtn.classList.add('text-yellow-400', 'bg-white/5');
        activeBtn.classList.remove('text-gray-500');
    }

    try {
        const response = await fetch(pageFiles[pageName]);
        if (!response.ok) throw new Error('Page not found');

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const content = doc.querySelector('section') ? doc.querySelector('section').outerHTML : html;

        container.innerHTML = content;
        window.scrollTo(0, 0);

    } catch (error) {
        console.error('Error loading page:', error);
        container.innerHTML = `
            <div class="w-full min-h-screen flex items-center justify-center text-white p-20">
                <div class="text-center">
                    <h2 class="text-2xl font-bold mb-2 text-yellow-400">Network Error</h2>
                    <p class="text-white/70">Siguraduhin na naka-<b>LIVE SERVER</b> ka (127.0.0.1).</p>
                    <button onclick="showPage('home')" class="mt-4 px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg">Go Home</button>
                </div>
            </div>`;
    }
}

// Detect current page from URL path
function getPageFromURL() {
    const path = window.location.pathname;
    const segment = path.split('/').filter(Boolean).pop(); // last segment
    return pageNames.includes(segment) ? segment : 'home';
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            const pageId = btn.id.replace('nav-', '');
            showPage(pageId);
        };
    });

    // Restore page from URL on load/refresh
    showPage(getPageFromURL());
});

// Handle browser back/forward
window.addEventListener('popstate', (e) => {
    const page = e.state?.page || getPageFromURL();
    showPage(page);
});