document.addEventListener('DOMContentLoaded', () => {
  const headerBtnMob = document.querySelector('.header-mob-btn');
  const mobMenuHeader = document.querySelector('.header-menu-mob');
  const menuOpenIcon = document.querySelector('.menu-open');
  const menuCloseIcon = document.querySelector('.menu-close');
  const closeBtn = document.querySelector('.header-menu-mob__close');
  const body = document.body;

  function openMenu() {
    if (!mobMenuHeader) return;
    mobMenuHeader.style.display = 'flex';
    if (menuOpenIcon) menuOpenIcon.style.display = 'none';
    if (menuCloseIcon) menuCloseIcon.style.display = 'block';
    body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!mobMenuHeader) return;
    mobMenuHeader.style.display = 'none';
    if (menuOpenIcon) menuOpenIcon.style.display = 'block';
    if (menuCloseIcon) menuCloseIcon.style.display = 'none';
    body.style.overflow = '';
  }

  function toggleMenu() {
    const isOpen = mobMenuHeader.style.display === 'flex';
    isOpen ? closeMenu() : openMenu();
  }

  if (headerBtnMob && mobMenuHeader) {
    headerBtnMob.addEventListener('click', toggleMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    document.querySelectorAll('.header-menu-mob-link').forEach((item) => {
      item.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) closeMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  const formSection = document.getElementById('form-section');
  if (!formSection) return;

  const triggerButtons = document.querySelectorAll(
    '.header__button, .header-menu-mob-btn'
  );

  triggerButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isMobBtn = btn.classList.contains('header-menu-mob-btn');
      if (isMobBtn) closeMenu();

      requestAnimationFrame(() => {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  });
});