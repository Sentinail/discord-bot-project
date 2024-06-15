require("dotenv").config();
const { Client, GatewayIntentBits, InteractionType } = require("discord.js");
const express = require("express");

const app = express();
const port = process.env.PORT || 1500;

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.DirectMessages, 
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
]});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    respondToMessages();
});

function respondToMessages() {
    client.on('interactionCreate', async interaction => {
        if (interaction.type !== InteractionType.ApplicationCommand) return;

        if (interaction.commandName === 'say_hello') {
            try {
                const { user } = interaction;

                await user.send(`Hello to ${user.displayName}! This direct message was sent from the bot! commanded by ${user.displayName}`);

                interaction.reply('Hello! I have sent you a direct message!');
            }

            catch (error) {
                console.error(error);

                interaction.reply('There was an error while executing this command!');
            }
        }

        else if (interaction.commandName === 'say_hello_to_all') {
            try {
                const { guild, user } = interaction;

                guild.members.cache.forEach(async member => {
                    if (member.user.bot) return;

                    await member.send(`Hello to ${member.displayName}, This direct message was sent from the bot! commanded by ${user.displayName}`);
                });

                interaction.reply('Hello! I have sent a direct message to all members in the server!');
            }

            catch (error) {
                console.error(error);

                interaction.reply('There was an error while executing this command!');
            }
        }
    });
}

client.login(process.env.DISCORD_TOKEN);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
