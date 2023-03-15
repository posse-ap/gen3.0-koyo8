'use strict'

const hamburgerBar = document.querySelector('.HamburgerBar');
const hamburgerBarTrue = document.querySelector('.HamburgerBarTrue');
const hamburgerBarFalse = document.querySelector('.HamburgerBarFalse');
const hamburger = document.querySelector('.Hamburger');

hamburgerBar.addEventListener('click', () => {
  hamburgerBar.classList.toggle('active');
  hamburgerBarTrue.classList.toggle('active');
  hamburgerBarFalse.classList.toggle('active');
  hamburger.classList.toggle('active');
}); 

hamburger.addEventListener('click' , () => {
  hamburgerBar.classList.toggle('active');
  hamburgerBarTrue.classList.toggle('active');
  hamburgerBarFalse.classList.toggle('active');
  hamburger.classList.toggle('active');
})