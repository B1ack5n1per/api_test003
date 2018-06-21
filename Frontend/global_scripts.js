var sending = {};
var username;
var password;
var account;

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
        $('#error').html('');
        console.log(document.cookie);
        location.reload();
      } else {
        $('#error').html('Invalid Username or Password');
      };
    },
  });
};

$(document).ready(() => {
  if (document.cookie) {
    $('#login').addClass('none');
    $('#logout').removeClass('none');
    account = document.cookie;
  } else {
    $('#login').removeClass('none');
    $('#logout').addClass('none');
  };

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
  $('#logout').on('click', () => {
    $.ajax({
      method: 'POST',
      url: '/logout',
      headers: {
        contentType: 'application/json',
      },
      data: {
        cookies: document.cookie,
      },
      success: (res) => {
          alert('Goodbye ' + res);
          location.reload();
        },
    });
  });
});
