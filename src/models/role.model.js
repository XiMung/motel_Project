const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

var roleShema = Schema({
  name: { type: String, required: true }
});


roleShema.plugin(uniqueValidator, { message: 'is already taken.' });
var roleModel = mongoose.model("role", roleShema);

module.exports = {
    roleModel: roleModel
}
