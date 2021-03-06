'use strict';

// dependencies

var url = require('url');
var request = require('request');
const Discord = require('discord.js');

const { token, prefix, riotkey, t_consumer_key, t_consumer_secret, t_access_token_key, t_access_token_secret } = require("./config.json");

// discord specigic
const client = new Discord.Client();

// client for bot

client.login(token);


var Twitter = require('twitter');
const { resolve } = require('path');

var twitterclient = new Twitter({
  consumer_key: t_consumer_key,
  consumer_secret: t_consumer_secret,
	access_token_key: t_access_token_key,
  access_token_secret: t_access_token_secret
});

var twitterparams = { screen_name: 'nodejs' };

async function tweetText(content, message){
  await twitterclient.post('statuses/update', { status: content }, function (error, tweet, response, message) {
    if (error) throw error;
    message.reply('Hi')
	})
}


// variables

var pastJason;
var jasonCount;

//functions

function RandomChoice(range){ return Math.floor(Math.random()*range )}



function playAudio(channel, filename, audiolevel){
  channel.join()
    .then(connection =>{
      const dispatcher = connection.play('./resources/' + filename + '.mp3', {volume: audiolevel});
      dispatcher.on("finish", finish => {channel.leave()});
    })
}


function checkValidVoice(channel, messageChannel){
  if (!channel)
    messageChannel.send("fuck off idiot, join a voice channel and try again");
  else
    return Boolean('True')
}


//start
client.on('ready', () => {
  console.log('QuimitchyBot, locked, and loaded!');
});


// messages
client.on('message', async (message) => {

  const voiceChannel = message.member.voice.channel;
  const messageChannel = message.channel
  const messageContent = message.content.toLowerCase();

  if (messageContent.includes('as mr walker once said')) {
    message.channel.send('https://tenor.com/view/funny-animals-walking-gorilla-ape-gif-11409190');
  }

  if (messageContent.includes('as mr axford once said')) {
    message.channel.send('https://tenor.com/view/mario-dancing-american-boy-mario-mario-dance-american-boy-mario-gif-gif-14611228');
  }


  if (messageContent.includes('bro')) {
    message.channel.send('dont say **b-r-o**, say bruh instead')
    if (RandomChoice(2) == 0){
      message.channel.send('https://tenor.com/view/man-dont-care-dance-dancing-funny-meme-gif-16672353');
    } else {
      message.channel.send('https://giphy.com/gifs/funny-fnaf-five-nights-at-freddys-3BKJ5ehjClcC4')
    }
  }

  if (messageContent === prefix + 'derulocount'){
    message.channel.send('Current Derulo Count is: ' + ((jasonCount+1).toString()) );
  }

  // AUDIO SECTION
  if (messageContent.includes('jason') && messageContent.includes('derulo')){
    if (checkValidVoice(voiceChannel, messageChannel)){

      var nextJason = RandomChoice(4);
      playAudio(voiceChannel,'./jasonderulo/jasonderulo' + nextJason.toString(), 0.4);

      if (pastJason == nextJason){
        jasonCount++
        console.log(jasonCount);
      } else {
        jasonCount = 0;
        console.log(jasonCount);
      }

      pastJason = nextJason;

    }
  }

  if (messageContent === prefix + 'sarabruh' || messageContent === prefix + 'bruh'){

    if (checkValidVoice(voiceChannel, messageChannel)){
      message.channel.send('One BRUH, coming up!')
      playAudio(voiceChannel,'sarabruh', 1.5);
    }
  }

  if (messageContent === prefix + 'jasonbruh'){

    if (checkValidVoice(voiceChannel, messageChannel)){
      message.channel.send('*be creative with it, do whatever you want, its your bot, its your rules!* - nat 2020')
      playAudio(voiceChannel,'jasonderulobruh', 0.4);
    }
  }


  if (messageContent.includes('obama')){

    if (checkValidVoice(voiceChannel, messageChannel)){
      playAudio(voiceChannel,'obama', 0.5);
    }
  }


  if (messageContent === prefix + 'nugget'){
    if (checkValidVoice(voiceChannel, messageChannel)){
      playAudio(voiceChannel,'nugget', 0.5);
    }
  }
  
  // ETC SECTION

  if (messageContent === prefix + 'leave'){
    if (checkValidVoice(voiceChannel, messageChannel)){
      voiceChannel.leave();
    }
  }


  if (messageContent.split(' ')[0] === prefix + 'tweet'){
	var args = message.content.split(' ')
	args.shift()
	var tweetContent = args.join(' ')
	var tweetId = await tweetText(tweetContent, message).then((tweetId) => {
		message.reply('Tweeted ``' + tweetContent + '``')
	})



  }
  

  
  

});
