'use strict';

const openButton = document.querySelector('.header-button');
const closeButton = document.querySelector('.modal-close-button');
const inputButton = document.querySelector('.modal-button')
const body = document.querySelector('#body');
const modal = document.querySelector('.modal');
const modalBody = document.querySelector('.modal-body')

openButton.addEventListener('click' , () => {
  body.classList.add('active');
  modal.classList.remove('modal-close');
  modalBody.classList.add('modal-open');
});

closeButton.addEventListener('click' , () => {
  body.classList.remove('active');
  modalBody.classList.remove('modal-open');
  modal.classList.add('modal-close');
  if(modalBody.classList.contains('modal-off')){
    modalBody.classList.remove('modal-off');
  }
})

inputButton.addEventListener('click' , () => {
  modalBody.classList.add('modal-off');
})
