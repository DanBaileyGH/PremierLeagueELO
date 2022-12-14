const Discord = require('discord.js');
const { MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const {Client, Intents} = require('discord.js')
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
const fs = require('fs');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const path = require('path');
const config = require('./config.json');

client.on('ready', function (evt) {
    console.log('ready');
    client.user.setActivity("b!help");
});

const prefix = "b!";

const commandPath = path.dirname(__dirname);
const commandFiles = fs.readdirSync(`${commandPath}/commands`).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`${commandPath}/commands/${file}`);
    client.commands.set(command.name, command);
    if (command.aliases) {
        command.aliases.forEach(alias => {
            client.aliases.set(alias, command);
        });
    };
}

client.login(config.BOT_TOKEN);

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(' ');
    const commandName = args.shift().toLowerCase();
    let command = client.commands.get(commandName) || client.aliases.get(commandName);

    if (command == null) return;

    console.log(message.author.username + ' used command: ' + command.name);
    try {
        let output = await command.execute(message, args, Discord);
        output = JSON.stringify(output, null, 4);
        message.channel.send(output);     

        if(command.name == "addgame") {
            const ch = client.channels.cache.find(c => c.id == 1008454146229293228);
            ch.send({files: [`${commandPath}/teams.json`]});
        }
    } catch (error) {
        console.log(error);
        message.reply('error executing command');
    }
});