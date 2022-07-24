/**
 * Thoughts on making a new collection in db to cut out complex calculation
 *
 */

let mongoose = require("mongoose");

let Schema = mongoose.Schema;

// Data structure for the new data model
// all in lowercase
let dashboardDataSchema = new Schema(
    // Common
    {
        id_unique: String,
        // Common - Grouping keys
        id_country: String,
        region: String,
        id_proj: String,
        id_form: String,
        api_tot_ppp_income_pd_pmae: Number, // total income per day per mae in usd

        // Home Page
        api_gps: Array,

        // Livelihood Page
        // year: Number,
        api_mae: Number,
        api_currency_conversion: Number,
        api_income_lstk_ppp_pd_pmae: Number,
        api_income_crop_ppp_pd_pmae: Number,
        api_income_offfarm_ppp_pd_pmae: Number,
        api_cons_lstk_ppp_pd_pmae: Number,
        api_cons_crop_ppp_pd_pmae: Number,

        // Food Security Page
        api_hfias_status: String,
        api_food_shortage_months: Array,
        api_hdds_flush: Number,
        api_hdds_lean: Number,
        api_food_flush: Array,
        api_food_lean: Array,

        // Crops Page
        api_crops_all: Array,
        api_consumed_sold1: Array, // Maybe these keys could fit in an array?
        api_consumed_sold2: Array,
        api_consumed_sold3: Array,
        api_consumed_sold4: Array,
        api_consumed_sold5: Array,
        api_consumed_sold6: Array,
        api_consumed_sold7: Array,
        api_consumed_sold8: Array,
        api_name_yield1: Array,
        api_name_yield2: Array,
        api_name_yield3: Array,
        api_name_yield4: Array,
        api_name_yield5: Array,
        api_name_yield6: Array,
        api_name_yield7: Array,
        api_name_yield8: Array,
        api_landArea: Number, // lower-case for all keynames might be better

        // Livestock Page
        api_livestocks_kept: Array,
        api_meat_sold_consumed: Array,
        api_eggs_sold_consumed: Array,
        api_milk_sold_consumed: Array,
        api_breed_improved: Array,

        // Off farm Page
        // offfarm_income_proportion: // Type undefined, 'api_' prefix missing
        api_off_farm_propotion:String,
        api_off_farm_months: Array,
        api_off_farm_activities: Array,
        api_off_farm_spending: Array,
    },
    {
        collection: "dashboard",
        versionKey: false
    },

);

module.exports = mongoose.model("dashboard", dashboardDataSchema);


