var datai;
var sending = {
  user: 'Taylor',
  password: 'B1ack5niper',
};

var username = $('#username');
var password = $('#password');
function add(datas) {
  for (let i = 0; i < datas.length; i++) {
    $('.container').append('<div class="content"> <img src = "' + datas[i].thumbnail + '"alt = ""class = "thumbnail" > <div class="contents"><h3 class = "title" >' + datas[i].title + '</h3> <h1 class = "votes" > <span>Rank: </span>' + (i + 1) + '</h1></div> </div>');
  };
};

function sorts(MyArray) {
  MyArray.sort((a, b) => {
    var keyA = a.votes;
    var keyB = b.votes;
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

  $('#login').on('click', () => {
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
        };
      },
    });
    console.log(username + ' ' + password);
  });
});
