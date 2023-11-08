const express = require("express");
const cors = require("cors");
const { getTopTracksFromArtist } = require("./main.js");

const path = __dirname + "/views";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path));

app.get("/", (req, res) => {
    res.send("Hellooooo");
});

app.get("/api", (req, res) => {
    getTopTracksFromArtist(req.query.artist)
    .then((names) => {
        res.json(names);
    })
    .catch(error => {
        console.log(error);
    });
});



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});