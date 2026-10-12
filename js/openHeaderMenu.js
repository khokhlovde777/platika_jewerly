document.addEventListener('DOMContentLoaded', () => {
  const headerBtnMob = document.querySelector('.header-mob-btn');
  const mobMenuHeader = document.querySelector('.header-menu-mob');
  const menuOpenIcon = document.querySelector('.menu-open');
  const menuCloseIcon = document.querySelector('.menu-close');
  const closeBtn = document.querySelector('.header-menu-mob__close');
  const body = document.body;

  if (!headerBtnMob || !mobMenuHeader) return;

  function openMenu() {
    mobMenuHeader.style.display = 'flex';
    if (menuOpenIcon) menuOpenIcon.style.display = 'none';
    if (menuCloseIcon) menuCloseIcon.style.display = 'block';
    body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobMenuHeader.style.display = 'none';
    if (menuOpenIcon) menuOpenIcon.style.display = 'block';
    if (menuCloseIcon) menuCloseIcon.style.display = 'none';
    body.style.overflow = '';
  }

  function toggleMenu() {
    const isOpen = mobMenuHeader.style.display === 'flex';
    isOpen ? closeMenu() : openMenu();
  }

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
});