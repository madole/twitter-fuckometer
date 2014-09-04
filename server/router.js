/**
 * Created by Madole on 1/09/2014.
 */
var express   = require('express'),
    app       = express(),
    Twit      = require('twit'),
    moment    = require('moment'),
    nl        = require('newlinetostring');

var twit = new Twit({
  consumer_key:'taSymqkQcArH8UpIoZsb6nwiZ',
  consumer_secret: 'xUZBBUW3QBD9EyUw0NWO5b9FEbiJXqMOdFcU2ShjdhPpXTMLoP',
  access_token: '20041121-agD5XfplN9pEcZ8xqHTXzd5aJixADqp3WwAHlML26',
  access_token_secret: 'Dt8PM98hAM5sxn5D191S8DfQnJI0uWVV7Aj8dyNMHdH5R'
});

function getFucksFromTwitter(req, res) {
  var query = req._parsedUrl.query.split('=');
  if(query[0] !== 'username') {return;}
  var username = query[1];
  var search = (username.indexOf('@')===0) ? username : '@' + username;

  console.log(search)
  twit.get('statuses/user_timeline', {screen_name: search, count: 100}, function(err, data) {
    var retObj = {
      count: 0,
      tweets: []
    }
    if(!data) {
      res.status(404);
      res.send('Couldn`t get data');
      return;
    }
    data.forEach(function(tweet){
      if(tweet.text.toLowerCase().indexOf('fuck') !== -1) {
        var tweetArr = tweet.text.split(' ');

        tweetArr = tweetArr.map(function(word) {
          if(word.indexOf('@') !== -1) {
            word = '<span class="twitterHandle"><a href="http://twitter.com/'+word+'">'+word+'</a></span>';
          }
          if(word.indexOf('fuck') !== -1){
            retObj.count++;
          }
          return word;
        });

        tweet.text = tweetArr.join(' ');
        retObj.tweets.push(nl(tweet.text + ' ' + moment(tweet.created_at).fromNow()));
      }
    });
    console.log('Your percentage of fucks given in the last 100 tweets is: ' + retObj.count + '%');
    res.status(200);
    res.send(retObj);
  });
}

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/getFucks/', getFucksFromTwitter);

var port = Number(process.env.PORT || 8000)
var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});

