var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var dataSchema = new Schema({
    rhomis_id: String,
    id_proj: String,
    id_country: String,
    year: String,
    project_full_name: String,
    country_full_name: String,
    regions: String,
    sub_regions: String,
},
    { collection: 'metadata' });

module.exports = mongoose.model('metadata', dataSchema);