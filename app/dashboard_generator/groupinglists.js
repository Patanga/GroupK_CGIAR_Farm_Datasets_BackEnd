const parseReq2Condition = (req) => {
    const condition = {};
    if (req.query.id_country) condition.id_country = req.query.id_country;
    if (req.query.region) condition.region = req.query.region;
    if (req.query.id_proj) condition.id_proj = req.query.id_proj;
    if (req.query.income !== undefined && req.query.income !== null) {
        switch (req.query.income) {
            case 'under1':
                condition.api_tot_ppp_income_pd_pmae = { $lte: 1 };
                break;
            case '1to1.9':
                condition.api_tot_ppp_income_pd_pmae = { $gt: 1, $lte: 1.9 };
                break;
            case 'over1.9':
                condition.api_tot_ppp_income_pd_pmae = { $gt: 1.9 };
                break;
            case 'global':
            default:
                break;
        }
    }
    return condition;
}
exports.parseReq2Condition = parseReq2Condition;

