$(document).ready(() => {
  const maxLength = parseInt($('.counter').text());
  $('textarea').on('keyup', () => {
    let charTyped = $('textarea').val().length
    $('.counter').text(maxLength - charTyped);
    if (charTyped > maxLength) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', ' #545149');
    }
  });
})