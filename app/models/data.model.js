let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let dataSchema = new Schema(
    {data: Object,
    projectID: String,
    formID: String,
    dataType: String}, 
    {collection: "data"}
);

dataSchema.method("toJSON", function() {
    const {_id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("data", dataSchema);