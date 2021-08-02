const mongoose = require("mongoose");
// var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

var reportShema = Schema({
    homeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "home"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    reason: { type: String, required: true },
    status: { type: Number, required: true },
    created_at: {type: Date}
});


// userShema.plugin(uniqueValidator, { message: 'is already taken.' });
var reportModel = mongoose.model("report", reportShema);

module.exports = {
    reportModel: reportModel
}
