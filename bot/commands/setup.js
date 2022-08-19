const fs = require('fs');

/* DONT WANT TO ACCIDENTALLY USE THIS AND RESET ALL STATS TO 0, KEEPING JUST IN CASE
module.exports = {
    name: 'setup',
    aliases: [""],
	description: 'Initial Setup',
	async execute(message, args) {
        const teamsList = ["Manchester City",
            "Liverpool",
            "Arsenal",
            "Tottenham",
            "Chelsea",
            "Manchester United",
            "West Ham",
            "Wolves",
            "Leicester City",
            "Brentford",
            "Aston Villa",
            "Newcastle United",
            "Brighton",
            "Crystal Palace",
            "Everton",
            "Leeds United",
            "Southampton",
            "Bournemouth",
            "Fulham",
            "Nottingham Forest"];

        let fullTeamsListObject = [];
        teamsList.forEach(team => {
            let elo = 0;
            let wins = 0;
            let losses = 0;
            let draws = 0;
            let teamObject = {"Team" : team, "ELO" : elo, "Wins" : wins, "Losses" :losses, "Draws" : draws}
            console.log(teamObject);
            fullTeamsListObject.push(teamObject);
        })
        console.log(fullTeamsListObject);
        const data = JSON.stringify(fullTeamsListObject, null, 4);
        let filePath = path.dirname(path.dirname(__dirname));
        fs.writeFile(`${filePath}/teams.json`, data, (err) => {
            if (err) {
                throw err;
            } else {
                console.log("Teams saved to file");
                
                message.channel.send("Teams Initialised");
            }
        })
    }
} */