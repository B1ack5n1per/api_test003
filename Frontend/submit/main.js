var name;
var image;
var send;
var username;
var password;
var sending = {};

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

function set() {
  name = document.getElementById('title').value;
  image = document.getElementById('image').value;
  send = {
    title: name,
    thumbnail: image,
  };
  console.log(send);
  if (name.length > 0 && image.length > 0) {
    $('#spinner').css('display', 'block');
    $.ajax({
      method: 'POST',
      url: '/add',
      heading: {
        contentType: 'application/json',
      },
      data: send,
      success: () => {
        alert(send.title + ' has been added to the list');
        location.reload();
      },
    });
  } else {
    if (image.length > 0) {
      alert('Please provide a title');
    } else {
      alert('Please provide an image');
    }
  };
};

function setup() {

};

$(document).ready(() => {
  $('#spinner').css('display', 'none');
  $('#image').on('blur', () => {
    image = document.getElementById('image').value;
    $('#template').attr('src', image);
  });
  $(document).on('keydown', () => {
    setTimeout(() => {
      name = document.getElementById('title').value;
      $('.text').html(name);
    }, 100);
  });
  $('.submit').on('click', () => {
    if ($('.submit').is(':focus')) {
      $('.submit').css('background', 'var(--Dark');
      $('.submit').trigger('blur');
      set();
    };
  });
  $('.submit').on('focus', () => {
    $('.submit').css('background', 'var(--Primary');
    setTimeout(() => {
      $('.submit').css('background', 'var(--Dark');
      $('.submit').trigger('blur');
    }, 5000);
  });
  $('.submit').on('blur', () => {
    $('.submit').css('background', 'var(--Dark)');
  });

});
