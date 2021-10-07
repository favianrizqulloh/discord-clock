//Import some packages needed
require('dotenv').config();
const moment = require('moment');
const tz = require('moment-timezone');
const chalk = require('chalk');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const { TIMEZONE, FORMAT, CHANNEL_ID, UPDATE_INTERVAL, BOT_TOKEN} = process.env;

//'ready' event
client.once('ready', () => {
  //init time
  const timeNow = moment().tz(TIMEZONE).format(FORMAT);
  //define clockChannel
  const clockChannel = client.channels.cache.get(CHANNEL_ID);
  //initial update
  clockChannel.edit({ name: `🕒 ${timeNow}` }, 'Clock update')
    .catch(console.error);
  //set the interval
  setInterval(() => {
    const timeNowUpdate = moment().tz(TIMEZONE).format(FORMAT);
    clockChannel.edit({ name: `🕒 ${timeNowUpdate}` }, 'Clock update')
      .catch(console.error);
  }, UPDATE_INTERVAL);
  setTimeout(() => {
    console.log("Stopping process with the code \"0\"...");
    process.exit(0);
  }, UPDATE_INTERVAL);
  //tells if it is ready
	console.log(chalk.greenBright("[READY]"), `Logged in as ${client.user.tag} (${client.user.id}) at ${moment().format("DD MMMM YYYY, HH:mm:ss")}`);
});

//log in
client.login(BOT_TOKEN);
