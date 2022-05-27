//Function for XSS 
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Function for creating the tweet w/HTML
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
    <p class="tweetContent">${escape(data.content.text)}</p>
  <footer class="tweetFooter">
    <span class="tweetDate">${timeago.format(data.created_at)}</span>
    <span class="tweetShare">
      <i class="fa-solid fa-flag fa-2xs"></i>
      <i class="fa-solid fa-retweet fa-2xs"></i>
      <i class="fa-solid fa-heart fa-2xs"></i>
    </span>
  </footer>
</article>`;

  return $tweet;
};

//Function to loop through database of tweets
const renderTweets = function(tweets) {
  $("#tweetContainer").empty();
  for (let tweet of tweets) {
    $("#tweetContainer").prepend(createTweetElement(tweet));
  }
};

//Function for loading the tweets via AJAX request
const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    type: "GET",
    dataType: "json",
    success: function(data) {
      renderTweets(data);
    },
  });
};

$(document).ready(function() {
  loadTweets();

  $("form").on("submit", (evt) => {

    //Prevents refresh on submit
    evt.preventDefault();

    //Main tweet form validation w/ errors
    const tweetLength = Number($("output.counter").val());
    if (tweetLength === 140) {
      $(".errorBlank").slideDown("fast");
      $(".errorMain").slideDown("fast");
      $(".errorTooLong").slideUp("fast");
    } else if (tweetLength < 0) {
      $(".errorTooLong").slideDown("fast");
      $(".errorMain").slideDown("fast");
      $(".errorBlank").slideUp("fast");
    } else {
      //Refreshes character counter
      $(".counter").val(140);
      $(".errorBlank").slideUp("fast");
      $(".errorTooLong").slideUp("fast");
      $(".errorMain").slideUp("fast");

      //Creates readly text from form
      let tweet = $("form").serialize();

      //Posts tweets via AJAX
      $.ajax({
        url: "/tweets",
        type: "POST",
        data: tweet,
        success: function() {
          loadTweets();
        },
      });

      //Clears tweet form on submit
      $("#tweetText").val("");
    }
  });

  $(".errorBlank").hide();
  $(".errorTooLong").hide();
  $(".errorMain").hide();
});
