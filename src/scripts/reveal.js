const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const progress = document.createElement('div');
progress.className = 'scroll-progress';
progress.setAttribute('aria-hidden', 'true');
document.body.append(progress);
const portrait = document.querySelector('.hero-portrait img');
let scrollFrame = 0;
function updateScroll() {
  scrollFrame = 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  if (portrait instanceof HTMLElement) {
    const section = document.querySelector('#start');
    const offset = section ? Math.min(window.scrollY, section.clientHeight) : 0;
    portrait.style.translate = reduceMotion.matches ? '' : `0 ${Math.min(offset * .055, 35)}px`;
  }
}
window.addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); }, {passive:true});
window.addEventListener('resize', updateScroll);
updateScroll();
if (!reduceMotion.matches && 'IntersectionObserver' in window) {
  const selector = 'main section h2, .project-card, .repository-card, .skill-cluster, #about .group, #contact .group, #timeline-container [data-aos]';
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.remove('scroll-pending');
      observer.unobserve(entry.target);
    }
  }, {threshold: .08, rootMargin: '0px 0px -25px 0px'});
  function register() {
    document.querySelectorAll(selector).forEach(element => {
      // Avoid animating headings inside a card twice.
      if (element.matches('h2') && element.closest('.repository-card')) return;
      if (element.classList.contains('scroll-reveal')) return;
      element.classList.add('scroll-reveal');
      const siblings = [...element.parentElement.children].filter(child => child.matches(selector));
      element.style.setProperty('--scroll-delay', `${Math.max(0, siblings.indexOf(element) % 3) * 100}ms`);
      if (element.getBoundingClientRect().top >= window.innerHeight - 25) {
        element.classList.add('scroll-pending');
        observer.observe(element);
      }
    });
  }
  register();
  const hydration = new MutationObserver(register);
  hydration.observe(document.querySelector('main'), {childList:true, subtree:true});
  reduceMotion.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    hydration.disconnect();
    document.querySelectorAll('.scroll-pending').forEach(element => element.classList.remove('scroll-pending'));
    updateScroll();
  }, {once:true});
}
