var sending = {};
var username;
var password;

function login() {
  sending.user = username;
  sending.password = password;
  console.log(sending);
  $.ajax({
    method: 'POST',
    url: '/login',
    headers: {
      contentType: 'application/json',
    },
    data: sending,
    success: (res) => {
      console.log(res);
      if (res == 200) {
        alert('welcome');
        $('#error').html('');
      } else {
        $('#error').html('Invalid Username or Password');
      };
    },
  });
};

$(document).ready(() => {
  $('.submit-log').on('click', () => {
    if ($('.submit-log').is(':focus')) {
      $('.submit-log').css('background', 'var(--Dark');
      $('.submit-log').trigger('blur');
      username = document.getElementById('username').value;
      password = document.getElementById('password').value;
      login();
      console.log(username + ' ' + password);
    };
  });
  $('.submit-log').on('focus', () => {
    $('.submit-log').css('background', 'var(--Primary');
    setTimeout(() => {
      $('.submit-log').css('background', 'var(--Dark');
      $('.submit-log').trigger('blur');
    }, 1000);
  });
  $('.submit-log').on('blur', () => {
    $('.submit-log').css('background', 'var(--Dark)');
  });
  $('#login').on('click', () => {
    $('.dark').fadeIn(250);
    setTimeout(() => {
      $('.login').fadeIn(150);
    }, 200);
  });
  $('#exit').on('click', () => {
    $('.login').fadeOut(250);
    setTimeout(() => {
      $('.dark').fadeOut(150);
    }, 200);
  });
});
