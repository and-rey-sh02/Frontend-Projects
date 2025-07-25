let burger = document.getElementById('burger');
let mobileMenu = document.getElementById('mobileMenu');
let closeBtn = document.getElementById('closeBtn');

burger.addEventListener('click', () => {
  mobileMenu.classList.add('active');
  document.documentElement.style.overflow = 'hidden';
  burger.classList.add('active'); 
});

closeBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
  document.documentElement.style.overflow = '';
  burger.classList.remove('active');
});