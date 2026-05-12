const isFile = window.location.protocol === 'file:';
const isGitHubPages = window.location.hostname.includes('github.io');
const basePath = isGitHubPages ? '/portfolio/' : '';

const pageFiles = {
    'home': basePath + 'home.html',
    'about': basePath + 'about.html',
    'stack': basePath + 'stack.html',
    'certificates': basePath + 'certificates.html'
};

const pageNames = Object.keys(pageFiles);

async function showPage(pageName) {
    if (!pageFiles[pageName]) pageName = 'home';

    const container = document.getElementById('content-area');
    if (!container) return;

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-yellow-400', 'bg-white/5');
        btn.classList.add('text-gray-500');
    });

    const activeBtn = document.getElementById('nav-' + pageName);
    if (activeBtn) {
        activeBtn.classList.add('text-yellow-400', 'bg-white/5');
        activeBtn.classList.remove('text-gray-500');
    }

    // file:// — use iframe (fetch is blocked)
    if (isFile) {
        container.innerHTML = `
            <iframe 
                src="${pageFiles[pageName]}"
                style="width:100%; height:100vh; border:none; display:block;"
            ></iframe>`;
        return;
    }

    // http:// — use fetch (Live Server or GitHub Pages)
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
                    <h2 class="text-2xl font-bold mb-2 text-yellow-400">Page Error</h2>
                    <p class="text-white/70">Something went wrong loading this page.</p>
                    <button onclick="showPage('home')" class="mt-4 px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg">Go Home</button>
                </div>
            </div>`;
    }
}

window.showPage = showPage;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            const pageId = btn.id.replace('nav-', '');
            showPage(pageId);
        };
    });

    showPage('home');
});

window.addEventListener('popstate', (e) => {
    const page = e.state?.page || 'home';
    showPage(page);
});