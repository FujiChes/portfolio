const pageFiles = {
    'home': 'home.html',
    'about': 'about.html',
    'stack': 'stack.html',
    'certificates': 'certificates.html'
};

const pageNames = Object.keys(pageFiles);

function showPage(pageName) {
    if (!pageFiles[pageName]) pageName = 'home';

    const container = document.getElementById('content-area');
    if (!container) return;

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

    // Use iframe — works without live server on file://
    container.innerHTML = `
        <iframe 
            src="${pageFiles[pageName]}"
            id="page-frame"
            style="width:100%; height:100vh; border:none; display:block; overflow-y:auto;"
        ></iframe>`;

    window.scrollTo(0, 0);
}

// Make showPage globally accessible from inside iframes
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