require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const Twit = require('twit');

const Twitter = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret:process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
})

bot.on('ready', (message) => {
  console.log('on!')
  const stream = Twitter.stream('statuses/filter', { follow: '1448762998840074240' })
  stream.on('tweet', function (tweet) {
    //`https://www.twitter.com/${tweet.user.screen_name}/status/${tweet.id}`
    // if link dont show up on preview, try using www infront instead

    let news = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
    if (tweet.user.screen_name === 'Underdog__NBA') {
      //console.log(tweet)
      bot.channels.cache.get('627344566562848805').send(news);
    }
  });
});

bot.login(process.env.bots_token);

//process.env.API_KEY, process.env.API_SECRET, process.env.PASSPHRASE