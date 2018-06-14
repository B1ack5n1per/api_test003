var data;

function add(data) {
  for (let i = 0; i < data.length; i++) {
    $('.container').append('<div class="content"> <img src = "' + data[i].thumbnail + '"alt = ""class = "thumbnail" > <div class="contents"><h3 class = "title" >' + data[i].title + '</h3> <h1 class = "votes" > <span>Rank: </span>' + (i + 1) + '</h1></div> </div>');
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
      data = res;
      sorts(data);
      add(data);
    },
  });

  $('#login').on('click', () => {
    $.ajax({
      type: 'GET',
      url: '/login',
      success: (res) => {
        console.log(res);
      },
    });
  });

});
