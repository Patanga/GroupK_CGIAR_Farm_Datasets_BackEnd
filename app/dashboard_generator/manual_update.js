// Manual entrance of Data generator

// Config Mongoose
const mongoose = require("mongoose");
let config = require("config"); // we load the db location from the JSON files
const dbHost = config.get("dbConfig.host");
const generator = require("./generator")

let connectWithRetry = function () {
    console.log("Connecting to database");
    return mongoose.connect(dbHost,
        { useNewUrlParser: true, useUnifiedTopology: true },
        function (err) {
            if (err) {
                console.error("Failed to connect to mongo on startup - retrying in 5 sec \n", err);
                setTimeout(connectWithRetry, 5000);
            }
        }
    );
}
connectWithRetry();

const db = mongoose.connection;
db.once("open", () => {
    console.log("Database connected:", dbHost);
    let msg = generator.generate();
    console.log(msg);
});


