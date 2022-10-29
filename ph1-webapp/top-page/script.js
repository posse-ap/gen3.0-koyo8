'use strict';

const openButton = document.querySelector('.header-button');
const closeButton = document.querySelector('.modal-close-button');
const inputButton = document.querySelector('.modal-button');
const body = document.querySelector('#body');
const modal = document.querySelector('.modal');
const modalBody = document.querySelector('.modal-body');
const modalLoad = document.querySelector('.loader');
const modalComplete = document.querySelector('.modal-complete');
const twitterCheckbox = document.querySelector('#twitter-share');

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
  if(modalComplete.classList.contains('modal-complete-on')){
    modalComplete.classList.remove('modal-complete-on');
  }
})

inputButton.addEventListener('click' , () => {
  if (twitterCheckbox.checked) {
    openTwiter();
  };

  modalBody.classList.add('modal-off');
  modalLoad.classList.add('modal-load-on');
  closeButton.classList.add('modal-off');
  window.setTimeout(() => {
    modalLoad.classList.remove('modal-load-on');
    modalComplete.classList.add('modal-complete-on');
    closeButton.classList.remove('modal-off');
}, 3000); //実際は3000

function openTwiter() {
  const twitterCommentText = document.getElementById('modal-twitter-comment-textbox').value;
  let twitterURL = "https://twitter.com/intent/tweet?text="+ twitterCommentText;
  window.open(twitterURL, '_blank');
}
})