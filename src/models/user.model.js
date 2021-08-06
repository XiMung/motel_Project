const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

var userShema = Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "role"
  },
  name: { type: String, required: true },
  phone: { type: String },
  avatar: { type: String },
  active: { type: Boolean },
});


userShema.plugin(uniqueValidator, { message: 'is already taken.' });
var userModel = mongoose.model("user", userShema);

module.exports = {
  userModel: userModel
}
