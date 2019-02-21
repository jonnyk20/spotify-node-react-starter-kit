
let mongo = require('mongoose');

let Schema = mongo.Schema;

let userSchema = new Schema({
    email: String
});

module.exports = mongo.model('User', userSchema);