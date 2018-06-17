var datai;

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
});
