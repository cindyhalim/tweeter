//ARROW ACTIONS

//NAV ARROW
$('.arrow').on('click', () => {
  $('.new-tweet').slideToggle();
  $('.tweet-text').focus();
});

//SCROLL ARROW BUTTON
$('#move-to-top-arrow').on('click', () => {
  $('.new-tweet').slideDown();
  $('html, body').animate({ scrollTop: 0 }, 100);
});

$(document).scroll(function () {
  const $writeTweet = $('.write-tweet');
  const $toTopArrow = $('#move-to-top-arrow');
  var y = $(this).scrollTop();
  if (y > 100) {
    $toTopArrow.fadeIn();
    $writeTweet.hide();
  } else {
    $toTopArrow.fadeOut();
    $writeTweet.show();
    $writeTweet.select();
    $('.tweet-text').focus();
  }
});