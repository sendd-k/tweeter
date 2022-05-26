/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1653343450440
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1653429850440
//   }
// ]



const createTweetElement = function(data) {
  const $tweet = `<article class="tweetBody">
  <header>
    <div class="tweetHeader">
      <div class="grid-child imgName">
    <img class="userIMG" src=${data.user.avatars}>
    <p class="userName">${data.user.name}</p>
  </div>
  <div class="grid-child">
    <span class="userHandle">${data.user.handle}</span>
    </div>
  </div>
  </header>
  <p class="tweetContent">${data.content.text}</p>
  <footer class="tweetFooter">
    <span class="tweetDate">${timeago.format(data.created_at)}</span>
    <span class="tweetShare">
      <i class="fa-solid fa-flag fa-2xs"></i>
      <i class="fa-solid fa-retweet fa-2xs"></i>
      <i class="fa-solid fa-heart fa-2xs"></i>
    </span>
  </footer>
</article>`

  return $tweet;
};


const renderTweets = function(tweets) {
  $('#tweetContainer').empty()
  for(let tweet of tweets) {
    //$('#tweetContainer').empty()
    //console.log('from render tweets', tweet)
    $('#tweetContainer').prepend(createTweetElement(tweet))
    //$('#tweetContainer').empty()
    
  }
}
const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    type: "GET",
    dataType: "json",
    success: function(data) {
      renderTweets(data)
    },
})
}

$(document).ready(function() {
  loadTweets()
  $('form').on('submit', (evt) => {
    evt.preventDefault();
    const tweetLength = Number($('output.counter').val());
    if (tweetLength === 140) {
      alert("Tweets cannot be blank!");
      return;
    } else if (tweetLength < 0) {
      alert("Tweets can only be 140 characters in length");
      return;
    }
    let tweet = $('form').serialize()
    $.ajax({ 
      url:"/tweets", 
      type: "POST",
      data: tweet,
      success: function() {
        loadTweets()
      }
    })
  })
  
})


