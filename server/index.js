const express = require("express");
const path = require('path');

const PORT = 3001;

let app = express();

const commandPath = (path.dirname(__dirname) + "/commands");
const teamCommand = require(`${commandPath}/team.js`);
const globalFunctions = require(`${commandPath}/globalFunctions.js`);

app.get("/allTeamsList", async(req, res) => {
    let data = await globalFunctions.getAllTeams();
    console.log("all teams fetched");
    res.json({data: data});
});

app.get("/team/:id", async(req, res) => {
    let data = await teamCommand.getTeamData(req.params.id);
    console.log(data.Team);
    res.json({data: data});
})

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
})