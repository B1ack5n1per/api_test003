var name;
var image;
var send;
function set() {
  name = document.getElementById('title').value;
  image = document.getElementById('image').value;
  send = {
    title: name,
    thumbnail: image,
  };
  console.log(send);
  if (name.length > 0 && image.length > 0) {
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
  $('#template').attr('src', image);
  $('.submit').on('click', () => {
    if ($('.submit').is(':focus')) {
      $('.submit').css('background', 'var(--Dark');
      $('.submit').trigger('blur');
      console.log('fire');
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
