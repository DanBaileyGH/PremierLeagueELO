const fs = require('fs');
const path = require("path");

async function getAllTeams(){
    let teamsList = [];
    return new Promise(resolve => {
        let filePath = path.dirname(__dirname);
        fs.readFile(`${filePath}/teams.json`, 'utf8', (err, data) => {
            if (err) {
                console.log("File read failed: ", err);
                return;
            }
            try {
                dataList = JSON.parse(data);
            } catch (err) {
                console.log("error parsing json string: ", err);
                return;
            }
            dataList.forEach(team => {
                teamsList.push(team);
            });
            resolve(teamsList);
        });
    });
}
module.exports.getAllTeams = getAllTeams;

async function getTeamData(teamName){
    let foundTeam = null
    let teamsList = await getAllTeams();
    return new Promise(resolve => {
        teamsList.forEach(team => {
            checkingName = team.Team.replace(/ /g, "").replace(/,/g, "").trim().toLowerCase(); //would love to use cleanName here but cant use await
            if (checkingName == teamName) {
                foundTeam = team;
            }
        });
        resolve(foundTeam);
    });
}
module.exports.getTeamData = getTeamData;

async function cleanName(name){
    return new Promise(resolve => {
        let cleanName = name.replace(/ /g, "").replace(/,/g, "").trim().toLowerCase();
        resolve(cleanName);
    })
}
module.exports.cleanName = cleanName;

async function sortTable(table, stat) {
    return new Promise(resolve => {
        for (let i = 1; i < table.length; i++) {
            let currentTeam = table[i];
            let j = i - 1;
            while((j > -1) && (currentTeam[stat] > table[j][stat])) {
                table[j+1] = table[j];
                j--;
            }
            table[j+1] = currentTeam;
        }
        resolve(table);
    });
}
module.exports.sortTable = sortTable;

async function cleanArray(uncleanArray) {
    let cleanedString = await cleanName(uncleanArray.join(" "));
    splitArray = cleanedString.split("-"); //unsure why this cant be one line
    return new Promise(resolve => {
        console.log(splitArray);
        resolve(splitArray);
    })
}
module.exports.cleanArray = cleanArray;