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

$(document).ready(() => {
  console.log(document.cookie);
  if (document.cookie) {
    profile = parse(document.cookie);
    $.ajax({
      method: 'POST',
      url: '/getProfile',
      headers: {
        contentType: 'application/json',
      },
      data: profile,
      success: (res) => {
        console.log(res);
        if (typeof res == 'object') {
          var id = res.vote_id;
          $('#spinner').css('display', 'none');
          $('title').html(res.username);
          $('.name').html(res.username);
          $('.name').css('display', 'block');
          $.ajax({
            method: 'POST',
            url: '/anime',
            headers: {
              contentType: 'application/json',
            },
            data: {
              id: id,
            },
            success: (resp) => {
              console.log(resp);
              console.log(resp.thumbnail + resp.title);
              $('.container').append('<div class="content"> <a href="' + resp.thumbnail + '" target="_blank"><img src = "' + resp.thumbnail + '"alt = ""class = "thumbnail" ></a> <div class="contents"><h3 class = "title" >' + resp.title + '</h3></div> </div>');
            },
          });
        };
      },
    });
  } else {
    $('#spinner').css('display', 'none');
    $('.dark').css('display', 'block');
    setTimeout(() => {
      $('.login').fadeIn(150);
    }, 200);
  };
});
