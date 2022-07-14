let dashboardDB = require("../models/dashboard_data");
const { parseReq2Condition } = require("./groupinglists");

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
