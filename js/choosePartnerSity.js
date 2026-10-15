document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.cont-inf-map-button');
  const images = document.querySelectorAll('.cont-inf-map-img');

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('cont-inf-map-button--active'));
      button.classList.add('cont-inf-map-button--active');

      images.forEach(img => img.classList.add('cont-inf-map-img--hidden'));
      if (images[index]) {
        images[index].classList.remove('cont-inf-map-img--hidden');
      }
    });
  });
  if (buttons[0]) buttons[0].click();
});