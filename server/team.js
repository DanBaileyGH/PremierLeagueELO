const globalFunctions = require('./globalFunctions.js');


async function getTeamData(teamName) {
    teamName = await globalFunctions.cleanName(teamName);
    let teamData = await globalFunctions.getTeamData(teamName);
    if (!teamData){
        return new Promise(resolve => {
            resolve("no team found"); 
        });
    };
    return new Promise(resolve => {
        resolve(teamData);
    });
}
module.exports.getTeamData = getTeamData;