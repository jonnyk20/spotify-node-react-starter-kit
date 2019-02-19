
let mongo = require('mongoose');

let Schema = mongo.Schema;

let tokenSchema = new Schema({
    name:  String,
    token: String
});

module.exports = mongo.model('Token', tokenSchema);