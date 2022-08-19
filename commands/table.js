const globalFunctions = require('./globalFunctions.js');

module.exports = {
    name: 'table',
    aliases: ["ta"],
	description: 'sends full leaderboard top to bottom sorted by chosen stat (defaults to elo)',
	async execute(message, args, Discord) {
        let sortingStat = args.length > 0 ? args.join(","): "ELO"; //default to sorting by elo
        let allTeamsList = await globalFunctions.getAllTeams();
        let sortedTeams = await globalFunctions.sortTable(allTeamsList, sortingStat);
        let outputEmbed = new Discord.MessageEmbed()
        .setTitle(`Full Table`)
        .setDescription(`Sorted By ${sortingStat}`)
        sortedTeams.forEach(function (team, i) {
            outputEmbed.addFields({name: `${i + 1} - ${team.Team}`, 
            value: `${sortingStat}: ${team[sortingStat].toFixed(0)}`, 
            inline: true}); 
        });
        return new Promise(resolve => {
            //temp
            message.channel.send({embeds: [outputEmbed]});
            resolve("a");
        });
    }
}