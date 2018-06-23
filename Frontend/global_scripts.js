var sending = {};
var username;
var password;
var account;
var send = {};
var ready = true;
var profile = {};
function parse(str) {
  str = str.split(', ');
  var result = {};
  for (var i = 0; i < str.length; i++) {
    var cur = str[i].split('=');
    result[cur[0]] = cur[1];
  };

  return result;
};

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
    profile = parse(document.cookie);
  } else {
    profile.username = 'Profile';
  };

  $('head').append('<link rel="icon" type="image/png" href="../favicon.ico">');
  $('body').prepend('<nav id="navbar"><div id="brand"> <a href="#">Anime</a></div><a class="item" id="list" href="../home">List</a><a class="item" id="submit" href="../submit">Submit</a><a class="item" id="Profile" href="../profile">' + profile.username + '</a><a href="#" class="item none" id="login">Login/Sign up</a><a href="#" class="item none" id="logout">Logout</a></nav><div class="login"><a href="#" id="exit">  <div class="exit">+</div></a><h1 class="log-title">Login</h1><input type="text" id="username"class="fillout" placeholder="Username"><input type="password" id="password" class="fillout" placeholder="Password"><p id="error"></p><input type="submit" class="submit-log log"><br/><hr/><br/><h1 class="signup log-title">Sign Up</h1><input type="text" id="username1" class="fillout" name="username" placeholder="Username"><input type="email" id="email" class="fillout" name="email" placeholder="Email"><input type="password" id= "passcode" class="fillout" name="password" placeholder="Password"><input type="password" class="fillout" id="confirm" name="confirm" placeholder="Confirm Password"><p>By creating an account I agree to the <a href="../terms" class="terms" >terms and conditions</a> of MyNewAnimeList</p><input type="submit" class="submit-log register"></div><div class="dark"></div>');
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
  $('.register').on('click', () => {
      ready = true;
      send.username = document.getElementById('username1').value;
      send.password = document.getElementById('passcode').value;
      send.confirm = document.getElementById('confirm').value;
      send.email = document.getElementById('email').value;
      console.log(send);
      let values = Object.values(send);
      for (var i = 0; i < values.length; i++) {
        if (values[i] == '') {
          ready = false;
        };
      };

      if (ready) {
        $.ajax({
          method: 'POST',
          url: '/register',
          headers: {
            contentType: 'application/json',
          },
          data: send,
          success: (res) => {
            location.reload();
          },
        });
      };
    });
});
