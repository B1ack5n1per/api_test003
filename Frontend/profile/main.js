var profile = {};
$(document).ready(() => {
  $.ajax({
    method: 'GET',
    url: '/getProfile',
    success: (res) => {
      if (res === 'error') {
        $('#login').trigger('click');
      } else {
        profile = res;
        $('title').html(profile.username);
        $('#login').fadeOut(10);
      };
    },
  });
});
