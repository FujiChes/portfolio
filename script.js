// 1. Dito natin tinuturo ang tamang folder path
const pageFiles = {
    'home': 'home.html',
    'about': 'about.html', 
    'stack': 'stack.html',
    'certificates': 'certificates.html'
};

async function showPage(pageName) {
    const container = document.getElementById('content-area');
    if (!container) return;

    try {
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

        // FETCHING: Idinagdag natin ang tamang folder sa path
        const response = await fetch(pageFiles[pageName]);
        if (!response.ok) throw new Error('Page not found');
        
        const html = await response.text();
        
        // Gagawin nating HTML ang text para makuha lang ang kailangan
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Susubukan nating kunin ang <section>, kung wala, buong file ang kukunin
        const content = doc.querySelector('section') ? doc.querySelector('section').outerHTML : html;
        
        // Dito na papasok ang design sa gitna
        container.innerHTML = content;
        
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

// Kapag nag-load ang website
document.addEventListener('DOMContentLoaded', () => {
    // I-setup ang lahat ng buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            const pageId = btn.id.replace('nav-', '');
            showPage(pageId);
        };
    });
    
    // I-load ang home by default
    showPage('home');
});