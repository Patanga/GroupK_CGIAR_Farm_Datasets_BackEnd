let dashboardDB = require("../models/dashboard_data");
const { buildAPIData } = require("../controllers/data.controller");

exports.updateDashboard = async (req, res) => {
    res.send(await generate());
}

const generate = async () => {
    console.log("Start to update collection \'dashboard\' for db")
    // No need for calculation for new updated processors
    // Just Pull Whole Data from 'data.getAllPages'
    // Collecting all combined raw data
    // const rawComDataList = await buildAPIData("allPages");
    // // Calculate dashboard data
    // var dashboardData = rawComDataList.map((doc) => calDashboardDoc(doc));
    const dashboardData = await buildAPIData("allPages");
    console.log(dashboardData.length + " records of dashboardData")

    // Delete all docs in dashboard collection for testing
    dashboardDB.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
            return ("Deleting collection \'dashboard\' failed.");
        }
    });
    // Push to db server
    dashboardDB.insertMany(dashboardData, (err) => {
        if (err) {
            console.log(err);
            return ("Updating collection \'dashboard\' failed.");
        }
    })
    return ("Succeed in update db");
}
exports.generate = generate;

