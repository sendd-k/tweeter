$(document).ready(function() {
  $("#tweetText").on("keyup", function () {
    let maxLength = 140;
    const currentLength = $(this).val().length  
    let remainder = maxLength - currentLength
    $(".counter").text(remainder)
    if(currentLength > maxLength) {
      $(".counter").css("color", "red")
    } else {
      $(".counter").css("color", "black")
    }
  })
});