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
  const stream = Twitter.stream('statuses/filter', { follow: '3444040513' })
  stream.on('tweet', function (tweet) {
    //console.log(`https://www.twitter.com/${tweet.user.screen_name}/status/${tweet.id}`);
    // if link dont show up on preview, try using www infront instead
    let news = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id}`
    bot.channels.cache.get('627344566562848805').send(news);
  });
});

// poll nbafantasylabs twitter every 1 sec and post the most recent tweet


//TODO: change this to use configs.token in the future
bot.login(process.env.bots_token);

//process.env.API_KEY, process.env.API_SECRET, process.env.PASSPHRASE