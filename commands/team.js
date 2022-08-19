const globalFunctions = require('./globalFunctions.js');

module.exports = {
    name: 'team',
    aliases: ["t"],
	description: 'Returns team stats',
	async execute(message, args) {
        let teamName = await globalFunctions.cleanName(args.join(","));
        let teamData = await globalFunctions.getTeamData(teamName);
        if (!teamData){
            message.channel.send("no team found"); 
            return
        }
        return new Promise(resolve => {
            resolve(teamData);
        });
    }
}