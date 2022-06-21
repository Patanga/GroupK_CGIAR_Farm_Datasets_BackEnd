var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var dataSchema = new Schema({
    dataType: String,
    formID: String,
    projectID: String,
    data: Object
},
    { collection: 'data' });

module.exports = mongoose.model('data', dataSchema);