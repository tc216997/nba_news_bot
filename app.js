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

    let update = `https://www.twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
    //in_reply_to_screen_name: 'GangGreenNYK'
    //in_reply_to_user_id: 994213352535621600
    //in_reply_to_status_id: 1450617597502894000
    //in_reply_to_user_id: null
    //in_reply_to_screen_name: null
    //in_reply_to_status_id: null

    let isReply = !(tweet.in_reply_to_user_id)
    // check if tweet is a reply and mark it as true

    //only paste tweet if its not a reply to another acct
    if (tweet.user.screen_name === 'Underdog__NBA' && isReply) {
      console.log(tweet)
      bot.channels.cache.get('627344566562848805').send(update);
    }
  });
});

bot.login(process.env.bots_token);

//process.env.API_KEY, process.env.API_SECRET, process.env.PASSPHRASE