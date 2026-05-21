document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';

    document.querySelectorAll('.nav-btn').forEach(btn => {
        const href = btn.getAttribute('href');
        if (href === currentPage) {
            btn.classList.add('text-yellow-400', 'bg-white/5');
            btn.classList.remove('text-gray-500', 'hover:text-yellow-400');
        } else {
            btn.classList.remove('text-yellow-400', 'bg-white/5');
            btn.classList.add('text-gray-500', 'hover:text-yellow-400');
        }
    });
});