/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = (tweets) => {
  for (let item of tweets) {
    const $tweetElement = createTweetElement(item);
    $(document).ready(() => {
      $('#tweets-container').append($tweetElement);
    });
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
  return Math.floor(Math.abs((timestampToday - date)/(1000 * 60 * 60 * 24)));
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

renderTweets(data);