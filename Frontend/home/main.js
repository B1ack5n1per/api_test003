var datai;
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

function add(datas) {
  for (let i = 0; i < datas.length; i++) {
    $('.container').append('<div class="content"> <a href="' + datas[i].thumbnail + '" target="_blank"><img src = "' + datas[i].thumbnail + '"alt = ""class = "thumbnail" ></a> <div class="contents"><h3 class = "title" >' + datas[i].title + '</h3> <h1 class = "votes" > <span>Rank: </span>' + (i + 1) + '</h1></div> </div>');
  };
};

function sorts(MyArray) {
  MyArray.sort((a, b) => {
    let keyA = a.votes;
    let keyB = b.votes;
    console.log(keyA, keyB);
    return keyB - keyA;
  });
  console.log(MyArray);
};

$(document).ready(() => {
  $.ajax({
    type: 'GET',
    url: '/anime',
    success: (res) => {
      $('#spinner').css('display', 'none');
      datai = res;
      sorts(datai);
      add(datai);
    },
  });
  $('.submit').on('click', () => {
      if ($('.submit').is(':focus')) {
        $('.submit').css('background', 'var(--Dark');
        $('.submit').trigger('blur');
        username = document.getElementById('username').value;
        password = document.getElementById('password').value;
        login();
        console.log(username + ' ' + password);
      };
    });
  $('.submit').on('focus', () => {
    $('.submit').css('background', 'var(--Primary');
    setTimeout(() => {
      $('.submit').css('background', 'var(--Dark');
      $('.submit').trigger('blur');
    }, 1000);

  });
  $('.submit').on('blur', () => {
    $('.submit').css('background', 'var(--Dark)');
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
