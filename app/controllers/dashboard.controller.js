const { parseReq2Condition } = require("../dashboard_generator/groupinglists");
const { generate } = require("../dashboard_generator/generator");

// Get Schema
let dashboardDB = require("../models/dashboard.model");


exports.getDashboardData = async (req, res) => {
    let condition = parseReq2Condition(req);
    // res.send(condition);
    console.log("Query for dahboard data, condition:")
    console.log(condition)
    res.send(await dashboardDB.find(condition));
};

exports.getGroupingLists = async (req, res) => {
    let condition = parseReq2Condition(req);
    const countryList = await dashboardDB.distinct("id_country", condition);
    const regionList = await dashboardDB.distinct("region", condition);
    const projectList = await dashboardDB.distinct("id_proj", condition);
    res.send({ countryList, regionList, projectList });
    console.log('Fetching grouping lists')
}

exports.updateDashboard = async (req, res) => {
    res.send(await generate());
}
