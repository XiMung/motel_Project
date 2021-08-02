var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var districtSchema = Schema({
    name: String,
    idCity: { type: Schema.ObjectId, ref: "city" }
});

var districtModel = mongoose.model("district", districtSchema);
module.exports = {
    districtModel: districtModel
}