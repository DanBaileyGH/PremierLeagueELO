const globalFunctions = require('./globalfunctions.js');

module.exports = {
    name: 'table',
    aliases: ["ta"],
	description: 'sends full leaderboard top to bottom sorted by chosen stat (defaults to elo)',
	async execute(message, args) {
        return new Promise(resolve => {
            resolve(getTable(args));
        })
        
    }     
}

async function getTable(args) {
    let sortingStat = args.length > 0 ? args.join(","): "ELO"; //default to sorting by elo
    console.log(sortingStat);
    let validStats = ["Team", "ELO", "Wins", "Losses", "Draws", "GoalsFor", "GoalsAgainst"] //todo: automate this by checking field names in teams.json
    if (!(validStats.includes(sortingStat))) { //invalid stat to sort by
        return new Promise(resolve => {
            resolve({"Error": "Invalid Stat"});
        });
    }
    let allTeamsList = await globalFunctions.getAllTeams();
    let sortedTeams = await globalFunctions.sortTable(allTeamsList, sortingStat);
    console.log(sortedTeams);
    return new Promise(resolve => {
        resolve(sortedTeams);
    });
}
module.exports.getTable = getTable;