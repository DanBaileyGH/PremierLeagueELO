const globalFunctions = require('./globalFunctions.js');

module.exports = {
    name: 'predict',
    aliases: ["pr"],
	description: 'predict result of a game between two entered teams using their elo',
	async execute(message, args) {
        return new Promise(resolve => {
            resolve(predictGame(args));
        })
    }
}

async function predictGame(args) {
    let teams = await globalFunctions.cleanArray(args);
    let team1Name = teams[0];
    let team2Name = teams[1];
    let team1 = await globalFunctions.getTeamData(team1Name);
    let team2 = await globalFunctions.getTeamData(team2Name);
    if (!team1 || !team2){
        return new Promise(resolve => {
            resolve("teams missing");
        });
    }
    
    let team1WinChance = (1.0 / (1.0 + Math.pow(10, ((team2.ELO - (team1.ELO + 68)) / 400))))*100 //+68 home team handicap
    let team2WinChance = (1.0 / (1.0 + Math.pow(10, (((team1.ELO + 68) - team2.ELO) / 400))))*100
    let team1DecimalOdds = (1 / (team1WinChance / 100));
    let team2DecimalOdds = (1 / (team2WinChance / 100));

    let outputObject = ({
        "home": team1.Team,
        "away": team2.Team,
        "homeelo": team1.ELO.toFixed(2),
        "awayelo": team2.ELO.toFixed(2),
        "homewinchance": team1WinChance.toFixed(2),
        "awaywinchance": team2WinChance.toFixed(2),
        "homeodds": team1DecimalOdds.toFixed(2),
        "awayodds": team2DecimalOdds.toFixed(2)
    });

    return new Promise(resolve =>{ 
        resolve(outputObject);
    });
}
module.exports.predictGame = predictGame;

