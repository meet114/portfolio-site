const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const progress = document.createElement('div');
progress.className = 'scroll-progress';
progress.setAttribute('aria-hidden', 'true');
document.body.append(progress);

let scrollFrame = 0;
function updateScroll() {
  scrollFrame = 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
}

window.addEventListener(
  'scroll',
  () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
  },
  { passive: true }
);
window.addEventListener('resize', updateScroll, { passive: true });
updateScroll();

if (!reduceMotion.matches && 'IntersectionObserver' in window) {
  const selector =
    'main section h2, .project-card, .repository-card, .skill-cluster, #about .group, #contact .group';
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove('scroll-pending');
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll(selector).forEach((element, index) => {
    if (element.matches('h2') && element.closest('.repository-card')) return;
    element.classList.add('scroll-reveal');
    element.style.setProperty('--scroll-delay', `${(index % 3) * 60}ms`);
    if (element.getBoundingClientRect().top >= window.innerHeight - 40) {
      element.classList.add('scroll-pending');
      observer.observe(element);
    }
  });
}
