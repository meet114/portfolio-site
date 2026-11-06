// Global animations using GSAP and AOS
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Make sure ScrollTrigger is properly registered
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const navbar = document.getElementById('navbar');
  const portfolioHome = document.body.classList.contains('portfolio-home');

  // Portfolio pages already use CSS hover + reveal.js — skip heavy GSAP/AOS work.
  if (portfolioHome) {
    if (navbar) {
      const onScroll = () => {
        navbar.classList.toggle('shadow-md', window.scrollY > 200);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
    return;
  }

  window.AOS?.init({
    duration: 600,
    easing: 'ease-out',
    once: true,
    offset: 50,
    disableMutationObserver: true,
  });

  if (navbar) {
    ScrollTrigger.create({
      start: 'top-=200',
      end: 99999,
      toggleClass: { className: 'shadow-md', targets: navbar }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        window.scrollTo({
          top: targetElement.offsetTop - navbarHeight - 20,
          behavior: 'smooth'
        });
        history.pushState(null, null, targetId);
      }
    });
  });
});
