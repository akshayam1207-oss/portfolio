document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Page loader ---------- */
  const loader = document.getElementById('loader');
  if(loader){
    window.addEventListener('load', () => setTimeout(() => loader.classList.add('hidden'), 350));
    setTimeout(() => loader.classList.add('hidden'), 1500);
  }

  /* ---------- Scroll progress bar ---------- */
  const progressBar = document.getElementById('scroll-progress');
  function updateProgress(){
    if(!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  /* ---------- Navbar shrink + back to top ---------- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  function onScroll(){
    updateProgress();
    if(navbar){ navbar.classList.toggle('scrolled', window.scrollY > 60); }
    if(backToTop){ backToTop.classList.toggle('show', window.scrollY > 500); }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinksList = document.getElementById('navLinks');
  if(navToggle && navLinksList){
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinksList.classList.toggle('open');
    });
    navLinksList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinksList.classList.remove('open');
      });
    });
  }

  /* ---------- Back to top ---------- */
  if(backToTop){ backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'})); }

  /* ---------- Button ripple effect ---------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e){
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  revealEls.forEach(el => io.observe(el));

  document.querySelectorAll('.reveal-stagger').forEach(block => {
    const items = block.querySelectorAll('.stagger-item');
    items.forEach((item, i) => { item.style.transitionDelay = (i * 0.07) + 's'; });
  });

  /* ---------- Floating particles (hero only) ---------- */
  const particleWrap = document.getElementById('particles');
  if(particleWrap){
    const particleColors = ['#33506B', '#2F7566', '#7E97AC'];
    const particleCount = window.innerWidth < 768 ? 14 : 26;
    for(let i=0;i<particleCount;i++){
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 4 + 2;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.bottom = '-20px';
      p.style.background = particleColors[i % particleColors.length];
      p.style.animationDuration = (Math.random() * 10 + 10) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      particleWrap.appendChild(p);
    }
  }

  /* ---------- Generic modal (used on protosem page) ---------- */
  const modalOverlay = document.getElementById('modalOverlay');
  if(modalOverlay){
    const modalBox = document.getElementById('modalBox');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');

    window.openModal = function(html, wide){
      modalContent.innerHTML = html;
      modalBox.classList.toggle('modal-wide', !!wide);
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    window.closeModal = function(){
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    };
    modalClose.addEventListener('click', window.closeModal);
    modalOverlay.addEventListener('click', (e) => { if(e.target === modalOverlay) window.closeModal(); });
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape') window.closeModal(); });
  }

});
