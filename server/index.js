const express = require("express");

const PORT = 3001;

let app = express();

const teamCommand = require("./team.js");
const globalFunctions = require('./globalFunctions.js');

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