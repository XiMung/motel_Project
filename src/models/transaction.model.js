const mongoose = require("mongoose");
// var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

var transactionShema = Schema({
    amount: { type: Number, required: true },
    content: { type: String, required: true },
    walletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "wallet"
    },
    type: { type: Number, required: true },
    date: { type: Date, require: true }
});


// userShema.plugin(uniqueValidator, { message: 'is already taken.' });
var transactionModel = mongoose.model("transaction", transactionShema);

module.exports = {
    transactionModel: transactionModel
}
