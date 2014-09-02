/**
 * Created by Madole on 1/09/2014.
 */

$(document).ready(function(){
  $('#title').addClass('animated bounceInLeft');
  $('#form').addClass('animated bounceInRight');
  $('hr').addClass('animated fadeIn');
  $('#footer').addClass('animated bounceInUp');
});

function getFucksFromServer(){
  var result      = $('#result');
  var user        = $('#user');
  var username    = $("#username").val();
  $('#form').addClass('animated hinge');
  $('.spinner').show();
  showTweetCycler();

  $.getJSON('http://localhost:8000/getFucks?username='+ username +'', function(obj) {
    var resultText = 'In the last <span>100</span> tweets, you have<br> given <span>'+obj.count+'</span> fucks!';
    user.html('<a href="http://twitter.com/'+ username + '"> @' + username +'</a>');
    $('.spinner').hide();
    result.html(resultText);
    result.addClass('animated fadeIn');
    showTweetCycler(obj.tweets);

    console.log('-------------')
    console.log(obj);
    console.log('-------------')
  });
}

function showTweetCycler(tweets) {
  var first = $('#cycler');
  var second= $('#cycler2');
  var cycleArr = [first, second];
  var current = first;
  setInterval(function() {
    var previous = current;
    current = cycleArr[getNext(current)];
    previous.removeClass();
    previous.addClass('animated flipOutX');
    current.html(tweets[Math.floor(Math.random() * tweets.length)]);
    current.removeClass();
    current.addClass('animated flipInX');
  }, 7000);
}

function getNext(current) {
  var first = $('#cycler');
  if(current.selector === first.selector) {
    return 1
  }else{
    return 0;
  }
}