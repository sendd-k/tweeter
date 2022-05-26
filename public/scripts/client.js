const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
      $(".errorBlank").slideDown('fast');
      $(".errorMain").slideDown('fast');
      $(".errorTooLong").slideUp('fast');
    } else if (tweetLength < 0) {
      $(".errorTooLong").slideDown('fast');
      $(".errorMain").slideDown('fast');
      $(".errorBlank").slideUp('fast');
    } else {
      
      $(".counter").val(140);
      
      $(".errorBlank").slideUp('fast');
      $(".errorTooLong").slideUp('fast');
      $(".errorMain").slideUp('fast');
      
    
    let tweet = $('form').serialize()
    $.ajax({ 
      url:"/tweets", 
      type: "POST",
      data: tweet,
      success: function() {
        loadTweets()
      }
    })
    $("#tweetText").val("");
  }
  })
  
  $(".errorBlank").hide();
  $(".errorTooLong").hide();
  $(".errorMain").hide();
  
})

