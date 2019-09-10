$(document).ready(() => {
  const maxLength = 140;
  const $counter = $(".new-tweet .counter");

  $(".counter").text(maxLength);

  $('textarea').on('keyup', function() {
    const charTyped = $(this).val().length;
    $counter.text(maxLength - charTyped);
    if (charTyped > maxLength) {
      $counter.addClass('overMax');
    } else {
      $counter.removeClass('overMax');
    }
  });
})