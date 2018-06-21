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
  $('body').prepend('<nav id="navbar"><div id="brand"> <a href="#">Anime</a></div><a class="item" id="list" href="../home">List</a><a class="item" id="submit" href="../submit">Submit</a><a class="item" id="Profile" href="../profile">Profile</a><a href="#" class="item none" id="login">Login/Sign up</a><a href="#" class="item none" id="logout">Logout</a></nav><div class="login"><a href="#" id="exit">  <div class="exit">+</div></a><h1 class="log-title">Login</h1><input type="text" id="username"class="fillout" placeholder="Username"><input type="password" id="password" class="fillout" placeholder="Password"><p id="error"></p><input type="submit" class="submit-log log"><br/><hr/><br/><form action="/register"><h1 class="signup log-title">Sign Up</h1><input type="text" class="fillout" name="username" placeholder="Username"><input type="email" class="fillout" name="email" placeholder="Email"><input type="text" class="fillout" name="password" placeholder="Password"><input type="text" class="fillout" name="confirm" placeholder="Confirm Password"><input type="submit" class="submit-log"></form></div><div class="dark"></div>');
  if (document.cookie) {
    $('#login').addClass('none');
    $('#logout').removeClass('none');
    account = document.cookie;
  } else {
    $('#login').removeClass('none');
    $('#logout').addClass('none');
  };

  //Submit login
  $('.log').on('click', () => {
    if ($('.log').is(':focus')) {
      $('.log').css('background', 'var(--Dark');
      $('.log').trigger('blur');
      username = document.getElementById('username').value;
      password = document.getElementById('password').value;
      login();
      console.log(username + ' ' + password);
    };
  });
  $('.log').on('focus', () => {
    $('.log').css('background', 'var(--Primary');
    setTimeout(() => {
      $('.log').css('background', 'var(--Dark');
      $('.log').trigger('blur');
    }, 1000);
  });
  $('.log').on('blur', () => {
    $('.log').css('background', 'var(--Dark)');
  });

  //Show login
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
