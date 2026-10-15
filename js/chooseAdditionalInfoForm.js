document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn-form-addit');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('btn-form-addit--active'));
      button.classList.add('btn-form-addit--active');
    })
  })
})