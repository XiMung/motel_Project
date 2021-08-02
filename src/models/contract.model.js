const mongoose = require("mongoose");
// var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

var contractShema = Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "home"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    deposit: { type: Number, require: true },
    date: { type: Date, required: true },
    status: { type: Number, required: true },
    created_at: { type: Date }
});


// userShema.plugin(uniqueValidator, { message: 'is already taken.' });
var contractModel = mongoose.model("contract", contractShema);

module.exports = {
    contractModel: contractModel
}
