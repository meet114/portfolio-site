const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const ring = document.createElement('div');
ring.className = 'custom-cursor-ring';
ring.setAttribute('aria-hidden', 'true');
const dot = document.createElement('div');
dot.className = 'custom-cursor-dot';
dot.setAttribute('aria-hidden', 'true');
document.body.append(ring, dot);
let x = 0, y = 0, trailX = 0, trailY = 0, frame = 0;
let visible = false;
const enabled = () => pointer.matches && !reduced.matches;
function hide() {
  visible = false;
  document.documentElement.classList.remove('cursor-active');
  cancelAnimationFrame(frame);
  frame = 0;
}
function paint() {
  trailX += (x - trailX) * .22;
  trailY += (y - trailY) * .22;
  ring.style.transform = `translate3d(${trailX}px,${trailY}px,0)`;
  dot.style.transform = `translate3d(${x}px,${y}px,0)`;
  if (visible && (Math.abs(x - trailX) > .1 || Math.abs(y - trailY) > .1)) frame = requestAnimationFrame(paint);
  else frame = 0;
}
document.addEventListener('pointermove', event => {
  if (!enabled() || event.pointerType !== 'mouse') return hide();
  x = event.clientX; y = event.clientY;
  if (!visible) { trailX = x; trailY = y; visible = true; }
  const target = event.target instanceof Element ? event.target : null;
  // Preserve text and form cursors for precise selection and editing.
  const editing = !!target?.closest('input, textarea, select, [contenteditable="true"]');
  document.documentElement.classList.toggle('cursor-active', !editing);
  ring.classList.toggle('is-link', !!target?.closest('a, button, [role="button"]'));
  ring.classList.toggle('is-card', !!target?.closest('.project-card, .repository-card, .hero-portrait'));
  if (!frame) frame = requestAnimationFrame(paint);
}, {passive:true});
document.addEventListener('pointerdown', () => ring.classList.add('is-pressed'));
document.addEventListener('pointerup', () => ring.classList.remove('is-pressed'));
document.addEventListener('pointerleave', hide);
window.addEventListener('blur', hide);
document.addEventListener('visibilitychange', () => { if (document.hidden) hide(); });
pointer.addEventListener('change', hide);
reduced.addEventListener('change', hide);
