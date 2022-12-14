const globalFunctions = require('./globalfunctions.js');

module.exports = {
    name: 'team',
    aliases: ["t"],
	description: 'Returns team stats',
	async execute(message, args) {
        return new Promise(resolve => {
            console.log(args);
            if (args.length == 0){
                resolve({"Error": "No Team Entered"});
                return;
            }
            resolve(getTeamData(args));
        })
    }
}

async function getTeamData(teamName) {
    console.log(teamName);
    teamName = await globalFunctions.cleanName(teamName.join(","));
    let teamData = await globalFunctions.getTeamData(teamName);
    if (!teamData){
        return new Promise(resolve => {
            resolve({"Error": "Team Not Found"}); 
        });
    };
    return new Promise(resolve => {
        resolve(teamData);
    });
}
module.exports.getTeamData = getTeamData;