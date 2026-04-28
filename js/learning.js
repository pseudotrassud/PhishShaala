// Subtle parallax on the hero image as user scrolls
window.addEventListener('scroll', function () {
    const heroImage = document.getElementById('hero-image');
    if (heroImage) heroImage.style.transform = `translateY(${window.scrollY * 0.15}px)`;
});

document.addEventListener('DOMContentLoaded', () => {
    // Fade in attack cards when they scroll into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-up-visible');
                entry.target.classList.remove('fade-up-hidden');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up-hidden').forEach(card => observer.observe(card));

    // Native <details> accordion — left as-is, CSS handles the animation
    // Uncomment below if you want accordion-style (only one open at a time)
    // document.querySelectorAll('details').forEach(target => {
    //   target.addEventListener('click', () => {
    //     document.querySelectorAll('details').forEach(d => { if (d !== target) d.removeAttribute('open'); });
    //   });
    // });
});
