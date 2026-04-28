// Loaded in <head> without defer — showSection/markComplete are called from onclick attributes
// so they need to exist before the body is parsed.

function showSection(id) {
    document.querySelectorAll('.content-section').forEach(el => el.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    // Keep sidebar highlight in sync
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const navItem = document.querySelector(`[onclick="showSection('${id}')"]`);
    if (navItem) navItem.classList.add('active');

    // Scroll content panel back to top on section change
    const mainContainer = document.querySelector('section.overflow-y-auto');
    if (mainContainer) mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
}

function markComplete(currentId, nextId, progressValue) {
    const progressBar = document.getElementById('progress-bar-fill');
    const progressText = document.getElementById('progress-text');
    if (progressBar) progressBar.style.width = `${(progressValue / 6) * 100}%`;
    if (progressText) progressText.innerText = `${progressValue}/6 Modules Reviewed`;
    showSection(nextId);
}

// Support deep-linking via URL hash, e.g. advance-learning.html#smishing
document.addEventListener('DOMContentLoaded', function () {
    const hash = window.location.hash.slice(1);
    if (hash) showSection(hash);
});
