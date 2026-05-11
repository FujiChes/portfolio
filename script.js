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

    // Use iframe instead of fetch — works without live server
    container.innerHTML = `
        <iframe 
            src="${pageFiles[pageName]}"
            style="width:100%; height:100vh; border:none; display:block;"
            scrolling="yes">
        </iframe>`;

    window.scrollTo(0, 0);
}

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