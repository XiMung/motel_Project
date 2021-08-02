var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var streetSchema = Schema({
    name: String,
    idDistrict: { type: Schema.ObjectId, ref: "district" }
});

var wardModel = mongoose.model("ward", streetSchema);
module.exports = {
    wardModel: wardModel
}