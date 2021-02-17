const Discord = require('discord.js');;
const bot = new Discord.Client();
const Twit = require('twit');
const configs = require('./config.js');
const Twitter = new Twit({
  consumer_key: configs.consumer_key,
  consumer_secret:configs.consumer_secret,
  access_token: configs.access_token,
  access_token_secret: configs.access_token_secret
})

bot.on('ready', (message) => {
  console.log('on!')
  //bot.channels.cache.get('627344566562848805').send('https://twitter.com/FantasyLabsNBA/status/1361134610793586689');
  
  //https://twitter.com/[screen name of user]/status/[id of status]
  //FantasyLabsNBA twitter id = 3444040513

  const stream = Twitter.stream('statuses/filter', { follow: '3444040513' })
  stream.on('tweet', function (tweet) {
    //console.log(`https://www.twitter.com/${tweet.user.screen_name}/status/${tweet.id}`);
    //https://twitter.com/FantasyLabsNBA/status/1361134610793586689
    // if link dont show up on preview, try using www infront instead

    let news = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id}`
    bot.channels.cache.get('627344566562848805').send(news);
  });
});

// poll nbafantasylabs twitter every 1 sec and post the most recent tweet


//TODO: change this to use configs.token in the future
bot.login(configs.bot_token);


