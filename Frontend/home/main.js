var datai;
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

function add(datas) {
  for (let i = 0; i < datas.length; i++) {
    $('.container').append('<div class="content"> <a href="' + datas[i].thumbnail + '" target="_blank"><img src = "' + datas[i].thumbnail + '"alt = ""class = "thumbnail" ></a> <div class="contents"><h3 class = "title" >' + datas[i].title + '</h3> <h1 class = "votes" ><a href="#"><div class="vote submit" data-id="' + datas[i].id + '">Vote</div></a> <span>Rank: </span>' + (i + 1) + '</h1></div>');
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

var loaded = false;

$(document).ready(() => {
  profile = parse(document.cookie);
  console.log(profile);
  $.ajax({
    type: 'GET',
    url: '/anime',
    success: (res) => {
      $('#spinner').css('display', 'none');
      datai = res;
      sorts(datai);
      add(datai);
      loaded = true;
      console.log(profile.username);
      $('.vote').on('click', function (event) {
        console.log($(event.target).attr('data-id'));
        let id =  $(event.target).attr('data-id');
        if (profile.username != 'Profile') {
          $('#spinner').css('display', 'block');
          $('.dark').css('z-index', '1');
          $('.dark').fadeIn(0);
          $.ajax({
            method: 'PUT',
            url: '/vote',
            headers: {
              contentType: 'aplication/json',
            },
            data: {
              username: profile.username,
              id: id,
            },
            success: (res) => {
                alert('Your favourite anime was set to ' + res.title);
                setTimeout(() => {
                  window.location = '../home';
                }, 1500);
              },
          });
        } else {
          alert('Please login to vote');
        };
      });
    },
  });
});
