var dotenv = require('dotenv');
dotenv.load();

var Rx = require('rx');
var Twit = require('twit')
var Promise = require("bluebird");

var T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY
  , consumer_secret:      process.env.CONSUMER_SECRET
  , access_token:         process.env.ACCESS_TOKEN
  , access_token_secret:  process.env.ACCESS_TOKEN_SECRET
})

var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]

var stream = T.stream('statuses/filter', { locations: sanFrancisco });

var source = Rx.Node.fromStream(stream, 'end');

var observer = Rx.Observer.create(
    function (tweet) {
        // THIS IS WHERE EACH TWEET SHOULD COME FROM THE STREAM
        console.log(tweet);
    },
    function (err) {
        console.log('Error getting tweets: ' + err);
    },
    function () {
        console.log('Completed');
    }
);

source.subscribe(observer);

