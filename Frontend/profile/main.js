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
        $('title').html(res.username);
      },
    });
  }
});
