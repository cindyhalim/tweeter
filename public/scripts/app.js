/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = (tweets) => {
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

//escape function takes care of text-contents that might be mistakenly read as code
const escape = (str) => {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const calculateDaysAgo = (date) => {
  let today = new Date();
  let timestampToday = today.getTime();
  return Math.floor(Math.abs((timestampToday - date) / (1000 * 60 * 60 * 24)));
}

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


$('form').submit(function (event) {
  event.preventDefault();
  const text = $('textarea').val();
  if (!text) {
    alert('Please enter text');
  } else if (text.length > 140) {
    alert('Tweet is too long')
  } else {
    $.ajax('/tweets', { method: 'POST', data: $('.tweet-text').serialize() })
    .then(addTweet());
  }
})


//fetching tweets from '/tweets'
const loadTweets = async () => {
  const response = await $.ajax({
    url: '/tweets',
    type: 'GET'
  });
  renderTweets(response);
}

loadTweets();

const addTweet = async () => {
  const response = await $.ajax({
    url: '/tweets',
    type: 'GET'
  });
  renderTweets(response[response.length - 1]);
}

$('.arrow').on('click', () => {
  $('.new-tweet').slideToggle();
});