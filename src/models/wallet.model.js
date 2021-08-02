const mongoose = require("mongoose");
// var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

var walletShema = Schema({
    amount: { type: Number, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});


// userShema.plugin(uniqueValidator, { message: 'is already taken.' });
var walletModel = mongoose.model("wallet", walletShema);

module.exports = {
    walletModel: walletModel
}
