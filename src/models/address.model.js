const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var addressShema = Schema({
    name: { type: String, required: true },
    district: { type: Array }
});

var addressModel = mongoose.model("address", addressShema);

module.exports = {
    addressModel: addressModel
}
