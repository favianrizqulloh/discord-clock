//Import some packages needed
const moment = require('moment');
const tz = require('moment-timezone');
const chalk = require('chalk');
const Discord = require('discord.js');
const client = new Discord.Client();
process.on("unhandledRejection",(error,promise) => {
  console.error(error)
})
const { timezone, format, clockchannel, updateinterval, token,bitrate,userLimit,guild_id,position } = require('./config.js');

//'ready' event
client.once('ready',async () => {
  //init time
  const timeNow = moment().tz(timezone).format(format);
  //No position, just in case the channel moved
  let clockChannel = client.channels.cache.find(channel => channel.bitrate === bitrate && channel.userLimit === channel.userLimit) 
  clockChannel.clone({ bitrate,userLimit,position,type:"voice",name:`🕒 ${timeNow}` })
  .then(async channel => {
    if (clockChannel) await clockChannel.delete()
    clockChannel =  channel
  })
  
  //set the interval
  setInterval(async () => {
    const timeNowUpdate = moment().tz(timezone).format(format);
    clockChannel.clone({ bitrate,userLimit,position,type:"voice",name:`🕒 ${timeNowUpdate}` })
    .then(async channel => {
      await clockChannel.delete()
      clockChannel =  channel
    })
  }, updateinterval);
  //tells if it is ready
	console.log(chalk.greenBright("[READY]"), `Logged in as ${client.user.tag} (${client.user.id}) at ${moment().format("DD MMMM YYYY, HH:mm:ss")}`);
});

//log in
client.login(token);
