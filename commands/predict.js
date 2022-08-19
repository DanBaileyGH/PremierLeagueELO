const globalFunctions = require('./globalFunctions.js');

module.exports = {
    name: 'predict',
    aliases: ["pr"],
	description: 'predict result of a game between two entered teams using their elo',
	async execute(message, args) {
        let teams = await globalFunctions.cleanArray(args);
        let team1Name = teams[0];
        let team2Name = teams[1];
        let team1 = await globalFunctions.getTeamData(team1Name);
        let team2 = await globalFunctions.getTeamData(team2Name);
        if (!team1){
            message.channel.send("no team 1 found"); 
            return
        };
        if (!team2){
            message.channel.send("no team 2 found"); 
            return
        };
        
        let team1WinChance = (1.0 / (1.0 + Math.pow(10, ((team2.ELO - (team1.ELO + 68)) / 400))))*100 //+68 home team handicap
        let team2WinChance = (1.0 / (1.0 + Math.pow(10, (((team1.ELO + 68) - team2.ELO) / 400))))*100
        let team1DecimalOdds = (1 / (team1WinChance / 100));
        let team2DecimalOdds = (1 / (team2WinChance / 100));

        let outputString = `team 1: ${team1.Team}, team 2: ${team2.Team}\n`;
        outputString += `team 1 elo: ${team1.ELO.toFixed(2)}, team 2 elo: ${team2.ELO.toFixed(2)}\n`;
        outputString += `team 1 win %: ${team1WinChance.toFixed(2)}, team 2 win %: ${team2WinChance.toFixed(2)} (team 1 +68 elo home advantage)\n`;
        outputString += `NOTE: this is technically the chances of a team winning plus half the chance of them drawing (eg 60% may be 40% chance of winning 40% chance of drawing, or 20% chance of winning 80% chance of drawing) theres no way of determining with raw elo. If using this data to bet, you would use the draw no bet markets\n`;
        outputString += `team 1 odds: ${team1DecimalOdds.toFixed(2)}, team 2 odds: ${team2DecimalOdds.toFixed(2)}\n`;
        outputString += `NOTE: if one number is lower than the one on the bookies, this represents value, and you would bet on that outcome`;
        return new Promise(resolve =>{ 
            resolve(outputString);
        });
    }
}

