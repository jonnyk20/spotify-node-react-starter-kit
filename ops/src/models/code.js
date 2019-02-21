
let mongo = require('mongoose');

let Schema = mongo.Schema;

let codeSchema = new Schema({
    uses:  Number,
    value: String
});

module.exports = mongo.model('Code', codeSchema);