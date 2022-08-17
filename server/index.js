const express = require("express");

const PORT = 3001;

let app = express();

app.get("/api", (req, res) => {
    res.send({ message: "Server Response" });
});

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
})