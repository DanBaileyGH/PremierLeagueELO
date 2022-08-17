const express = require("express");

const PORT = 3001;

let app = express();

const teamCommand = require("./team.js");

app.get("/api", (req, res) => {
    res.send({ message: "Server Response" });
});

app.get("/team/:id", async (req, res) => {
    let data = await teamCommand.getTeamData(req.params.id);
    console.log(data.Team);
    res.json({data: data});
})

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
})