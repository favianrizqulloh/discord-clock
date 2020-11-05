//Import some packages needed
const moment = require('moment');
const tz = require('moment-timezone');
const chalk = require('chalk');
const Discord = require('discord.js');
const client = new Discord.Client();

const { timezone, format, clockchannel, updateinterval, token} = require('./config.js');

//'ready' event
client.once('ready', () => {
  //init time
  const timeNow = moment().tz(timezone).format(format);
  //define clockChannel
  const clockChannel = client.channels.cache.get(clockchannel);
  //initial update
  clockChannel.edit({ name: `🕒 ${timeNow}` }, 'Clock update')
    .catch(console.error);
  //set the interval
  setInterval(() => {
    const timeNowUpdate = moment().tz(timezone).format(format);
    clockChannel.edit({ name: `🕒 ${timeNowUpdate}` }, 'Clock update')
      .catch(console.error);
  }, updateinterval);
  //tells if it is ready
	console.log(chalk.greenBright("[READY]"), `Logged in as ${client.user.tag} (${client.user.id}) at ${moment().format("DD MMMM YYYY, HH:mm:ss")}`);
});

//log in
client.login(token);
