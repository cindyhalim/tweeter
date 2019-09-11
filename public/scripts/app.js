/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//FUNCTIONS

const renderTweets = (tweets) => {
  console.log(tweets);
  if (Array.isArray(tweets)) {
    for (let item of tweets) {
      const $tweetElement = createTweetElement(item);
      $('#tweets-container').prepend($tweetElement);
    }
  } else {
    $('#tweets-container').prepend(createTweetElement(tweets));
  }
};

  //CREATE TWEET ELEMENT

//escape function takes care of cross-side scripting
const escape = (str) => {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const calculateDaysAgo = (date) => {
  let today = new Date();
  let timestampToday = today.getTime();
  return Math.floor(Math.abs((timestampToday - date) / (1000 * 60 * 60 * 24)));
};

const createTweetElement = (data) => {
  return `<article class="tweet">
  <header>
    <div class="user-info">
      <img src="${escape(data.user.avatars)}">
      <p class="username">${escape(data.user.name)}</p>
    </div>
    <p class="handle">${escape(data.user.handle)}</p>
  </header>

  <h3>${escape(data.content.text)}</h3>

  <footer>
    <p>${escape(calculateDaysAgo(data['created_at']))} days ago</p>
    <div class="action-icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>`;
};

const printError = message => {
  const $error = $('.error');
  $error.text(message);
  $error.slideDown();
};

//REQUESTS

//fetching the latest tweet
const addTweet = () => {
  $.ajax({
    url: '/tweets',
    type: 'GET',
    dataType: 'json'
  }).then((response) => {
    renderTweets(response[(response.length) - 1]);
  });
};

//fetching tweets from '/tweets'
const loadTweets = async () => {
  const response = await $.ajax({
    url: '/tweets',
    type: 'GET',
    dataType: 'json'
  });
  renderTweets(response);
};


$('form').submit(function (event) {
  event.preventDefault();
  const text = $('textarea').val();

  if (!text) {
    printError("Error: tweet cannot be left blank");

  } else if (text.length > 140) {
    printError("Error: tweet cannot be more than 140 characters long");

  } else {
    if ($('p').hasClass('error')) {
      $('.error').slideUp();
    }
    $.ajax('/tweets', { method: 'POST', data: $('.tweet-text').serialize() })
      .then(() => addTweet());
    $('textarea').val('');
    $('textarea').keyup()
  }
});

loadTweets();

//SCROLL UP BUTTON
$('.arrow').on('click', () => {
  $('.new-tweet').slideToggle();
});

$('#move-to-top-arrow').on('click', () => {
  $('html, body').animate({ scrollTop: 0 }, 200);
});

$('window').scroll(() => {
  $('#move-to-top-arrow').show();
})




