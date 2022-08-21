const express = require("express");
const path = require('path');

const PORT = 3001;

let app = express();

const commandPath = (path.dirname(__dirname) + "/commands");
const teamCommand = require(`${commandPath}/team.js`);
const predictCommand = require(`${commandPath}/predict.js`);
const globalFunctions = require(`${commandPath}/globalFunctions.js`);
const sortCommand = require(`${commandPath}/table.js`);

app.get("/allTeamsList", async(req, res) => {
    let data = await globalFunctions.getAllTeams();
    console.log("all teams fetched");
    res.json({data: data});
});

app.get("/team/:id", async(req, res) => {
    let data = await teamCommand.getTeamData([req.params.id]);
    res.json({data: data});
})

app.get("/predict/:args", async(req, res) => {
    let data = await predictCommand.predictGame(req.params.args.split(","));
    res.json({data: data});
});

app.get("/sorted/:stat", async (req, res) => {
    let data = await sortCommand.getTable([req.params.stat]);
    res.json({data: data});
});

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});