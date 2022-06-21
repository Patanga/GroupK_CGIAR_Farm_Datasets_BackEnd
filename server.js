
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
const port = config.get("dbConfig.port");
dotenv.config(); // wzj???


// Config Cors
// 前端的端口必须与此相符 wzj!
let corsOption = 
  { origin: "http://localhost:8081"};
app.use(cors(corsOption));


// Config BodyParser
// Ensuring that queries are not limited by size ??
// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "200mb" }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));



//{/* 
// 配置tunnel映射 wzj
const tunnel = require("tunnel-ssh");
const sshTunnelConfig = {
  keepAlive: true,
  host: 'freeedm.top',
  port: 22,
  dstHost: 'localhost',
  dstPort: '27017',
  localHost: '127.0.0.1',
  localPort: '27017',
  username: 'zhijun',
  privateKey: require('fs').readFileSync('./id_txserver')
};
tunnel(sshTunnelConfig, (error, server) => {
  if (error) {
    console.log("SSH connection error: ", error);
  }
})
//*/}



// Config Mongoose
const mongoose = require("mongoose");

let connectWithRetry = function() {
  console.log("Connecting to datase");
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

// 监听数据库连接状态 wzj
const db = mongoose.connection;
db.once("open", () => {
  console.log("Database connected:", dbHost);
});


// Config REST Routes
// simple route for test
app.get("/", (req, res) => {
  res.json({message: "Welcome to rhomis_dashboard_api application."})
});

// Define routes
require("./app/routes/projectData.routes")(app);
require("./app/routes/data.routes")(app);


// Set port, Listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});

// export app for test
module.exports = app;