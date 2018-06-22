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
      for (let i = 0; i < datai.length; i++) {
        $('.vote').eq(i).on('click', {
          value: i,
        }, function (event) {
          console.log(event.data.value);
          $.ajax({
              method: 'PUT',
              url: '/vote',
              headers: {
                contentType: 'aplication/json',
              },
              data: {
                username: profile.username,
                id: event.data.value,
              },
              success: (res) => {
                alert('Your favourite anime was set to ' + res.title);
              },
            });
        });
      };
    },
  });
});
