const globalFunctions = require('./globalFunctions.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'addgame',
    aliases: ["ag"],
	description: 'Adds a new game, changing the participants elo and win/loss/draw records',
	async execute(message, args) {
        return new Promise(resolve => {
            resolve(addGame(args));
        })
    }
}

async function addGame(args) {
    let cleanedArgs = await globalFunctions.cleanArray(args);
    //team 1 is the home team
    let team1Name = cleanedArgs[0];
    let team2Name = cleanedArgs[1];
    let team1Score = cleanedArgs[2];
    let team2Score = cleanedArgs[3];
    let team1 = await globalFunctions.getTeamData(team1Name);
    let team2 = await globalFunctions.getTeamData(team2Name);

    if (!team1){
        return new Promise(resolve =>{
            resolve("no team 1 found")
        });    
    };
    if (!team2){
        return new Promise(resolve =>{
            resolve("no team 2 found")
        });         
    };
    if (!team1Score || !team2Score) {
        return new Promise(resolve =>{
            resolve("scores unrecognised")
        });  
    }

    let eloWeighting = 40; //typical weighting for a league game
    let team1WinChance = (1.0 / (1.0 + Math.pow(10, ((team2.ELO - (team1.ELO + 68)) / 400)))) //+68 home team handicap
    let team2WinChance = (1.0 / (1.0 + Math.pow(10, (((team1.ELO + 68) - team2.ELO) / 400))))
    let goalDifference = team1Score - team2Score;
    let positiveGoalDifference = Math.abs(goalDifference);
    let team1NewElo;
    let team2NewElo;
    
    //goal difference adjustments
    if (positiveGoalDifference == 2) {
        eloWeighting = eloWeighting * 1.5;
    } else if(positiveGoalDifference == 3) {
        eloWeighting = eloWeighting * 1.75;
    } else if(positiveGoalDifference > 3) {
        eloWeighting = eloWeighting + (0.75 + ((positiveGoalDifference - 3) / 8));
    }
    let team1Multiplier = 0.5;

    if (goalDifference > 0) {
        //team 1 wins
        team1Multiplier = 1;
        team1.Wins += 1;
        team2.Losses += 1;
    } else if (goalDifference < 0) {
        //team 2 wins
        team1Multiplier = 0;
        team1.Losses += 1;
        team2.Wins += 1;
    } else {
        //draw
        team1.Draws += 1;
        team2.Draws += 1;
    }

    let team2Multiplier = 1 - team1Multiplier;
    team1NewElo = team1.ELO + eloWeighting * (team1Multiplier - team1WinChance);
    team2NewElo = team2.ELO + eloWeighting * (team2Multiplier - team2WinChance);

    let team1EloChange = team1NewElo - team1.ELO;
    let team2EloChange = team2NewElo - team2.ELO;
    let team1GoalsFor = team1.GoalsFor + parseInt(team1Score);
    let team1GoalsAgainst = team1.GoalsAgainst + parseInt(team2Score);
    let team2GoalsFor = team2.GoalsFor + parseInt(team2Score);
    let team2GoalsAgainst = team2.GoalsAgainst + parseInt(team1Score);

    //new stats
    team1.ELO = team1NewElo;
    team2.ELO = team2NewElo;
    team1.GoalsFor = team1GoalsFor;
    team1.GoalsAgainst = team1GoalsAgainst;
    team2.GoalsFor = team2GoalsFor;
    team2.GoalsAgainst = team2GoalsAgainst;

    saveNewStats(team1, team2);

    let outputObject = ({
        "home": team1.Team,
        "away": team2.Team,
        "homeinit": team1.ELO.toFixed(2),
        "awayinit": team2.ELO.toFixed(2),
        "homescore": team1Score,
        "awayscore": team2Score,
        "homenew": team1NewElo.toFixed(2),
        "awaynew": team2NewElo.toFixed(2),
        "homechange": team1EloChange.toFixed(2),
        "awaychange": team2EloChange.toFixed(2)
    });
    
    return new Promise(resolve =>{
        resolve(outputObject);
    });
}
module.exports.addGame = addGame;

async function saveNewStats(team1, team2) {
    let allTeamsList = await globalFunctions.getAllTeams();
    let newTeamsList = [];
    allTeamsList.forEach(team => {
        if (team.Team == team1.Team) {
            team = team1;
            console.log(`overwritten team 1`, team);
        } else if (team.Team == team2.Team) {
            team = team2;
            console.log(`overwritten team 2`, team);
        }
        newTeamsList.push(team);
    });
    console.log(newTeamsList);
    const data = JSON.stringify(newTeamsList, null, 4);
    let filePath = path.dirname(__dirname);
    fs.writeFile(`${filePath}/teams.json`, data, (err) => {
        if (err) {
            throw err;
        } else {
            console.log("Teams saved to file");
        }
    })
}