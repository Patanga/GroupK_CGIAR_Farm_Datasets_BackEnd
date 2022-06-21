const express = require('express')
const app = express()
const port = 3000;

// Import middleware bodyparser
const bodyParser = require('body-parser');
// Use bodypaser to process data sent through an HTTP request body.
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
// parse application/json
app.use(bodyParser.json());

// Connect to mongodb
var mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost:27017/rhomis-data-dev', (err) => {
    if(err) {
        console.log('Database connection failed.');
        return;
    }
    console.log('Database connected.');
})

const cors = require("cors");
app.use(cors());
app.options("*", cors());


// Defining routers
const dataRoute = require("./routes/data")
app.use("/api/data/", dataRoute)
const metadataRoute = require("./routes/metadata")
app.use("/api/metadata/", metadataRoute)

app.get('/', (req, res) => {
    res.send("Welcome to the Crops!")
});

app.post('/', (req, res) => {
    res.send(req.query)
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})
