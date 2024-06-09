require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { default: axios } = require("axios");
const express = require("express");
const url = require("url");

const app = express();
const port = process.env.PORT || 1500;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMembers] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    sendMessages();
});

async function sendMessages() {
    try {
        const channel = await client.channels.fetch(process.env.CHANNEL_ID);

        const guild = await client.guilds.fetch(process.env.GUILD_ID);

        const members = await guild.members.fetch();

        const memberUsernames = members.map(member => member.user.username);

        channel.send(`This is a test message from the bot. The members of the server are: ${memberUsernames.join(", ")}`);

    } catch (error) {
        console.log(error);
    }
}

client.login(process.env.DISCORD_TOKEN);
