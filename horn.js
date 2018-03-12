var googleTTS = require('google-tts-api');
var striptags = require('striptags');
var download = require('download-file')
var player = require('play-sound')(opts = {player: 'mpg123'})
const Discord = require("discord.js");
var client = new Discord.Client();
var util = require("util");
var sleep = require('sleep');

client.login('XXXXXXXXXXXXXXXXXXXXX'); // EDIT THIS TO YOUR TOKEN FROM DISCORD

var channelid = 'XXXXXXXXXXXXXXXXXXXX' // COPY CHANNEL ID YOU WANT TO ALERT ON

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});
client.on('message', message => {
  if((message.channel.id == channelid) && (message.content.indexOf("@everyone") > -1)){
  	console.log(striptags(message.content));
        if(message.content.length > 199) message.content = message.content.substring(0,199);
	googleTTS(striptags(message.content), 'en', 1)
	.then(function (url) {
	var options = {
    		directory: "/tmp/",
    		filename: "ping.mp3"
	}

	const exec = require("child_process").exec
	exec('blink.sh').unref()
	player.play('alarm.mp3', function(err){
                if (err) throw err
        })
	download(url, options, function(err){
		sleep.sleep(2)
	        player.play('/tmp/ping.mp3', function(err){
	                if (err) throw err
       		 })
	})

})
.catch(function (err) {
  console.error(err.stack);
});
  }
});
