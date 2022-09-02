
const bodyParser = require("body-parser"); 
const cors = require("cors");

// Getting environment variables
const dotenv = require("dotenv");

// Setting up server
const express = require("express");
const app = express();

// Configuration files
let config = require("config"); // we load the db location from the JSON files
const dbHost = config.get("dbConfig.host");
const configPort = config.get("dbConfig.port");
dotenv.config();


// Config Cors
let corsOption = 
  { origin: '*'};
app.use(cors(corsOption));


// Config BodyParser
// Ensuring that queries are not limited by size
// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "200mb" }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));


// Config Mongoose
const mongoose = require("mongoose");

let connectWithRetry = function() {
  console.log("Connecting to database");
  return mongoose.connect(dbHost, 
    {useNewUrlParser: true, useUnifiedTopology: true} ,
    function (err) {
      if (err) {
        console.error("Failed to connect to mongo on startup - retrying in 5 sec \n", err);
        setTimeout(connectWithRetry, 5000);
      }
    }
    );
}
connectWithRetry();

// Listening for database connection status
const db = mongoose.connection;
db.once("open", () => {
  console.log("Database connected:", dbHost);
});


// Config REST Routes
// simple route for test
app.get("/", (req, res) => {
  res.json({message: "Welcome to RHoMIS_Dashboard API application."})
});

// Define routes
require("./app/routes/data.routes")(app);
require("./app/routes/dashboard.routes")(app);
require("./app/routes/projectData.routes")(app);


// Set port, Listen for requests
// Port in environment variables will take precedence
const PORT = process.env.PORT || configPort;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});

// export app for test
module.exports = app;
