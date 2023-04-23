

const myButton = document.querySelector('.btn');
const btnContent = document.querySelector('.btn-icon');

myButton.addEventListener('click', function() {
  btnContent.classList.toggle('active');
});