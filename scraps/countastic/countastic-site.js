window.onload = loadDomEvents;

function loadDomEvents() {
  countastic();
}

function showAlert(msg, color) {
  var ninjaText = document.querySelector('#ninja-text');
  ninjaText.textContent = (!msg ? 'This is ninja' : msg); 
  ninjaText.parentElement.classList.remove('invisible');
  ninjaText.style.color = (!color ? 'black' : color);
}

function countastic() {
  new Countastic({
    countable: '#tweet-area',
    button: '#counter-btn',
    onWarning: function () { showAlert('Warning callback!', 'orange') } ,
    onMaxCount: function () { showAlert('Maximum chars used.', 'red') },
    onSuccess: function () { showAlert('The text is now on success.', '#03A678') }
  });
}
