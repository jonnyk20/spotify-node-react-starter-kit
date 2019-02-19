
let mongo = require('mongoose');

let Schema = mongo.Schema;

let topSchema = new Schema({
    time_range: String,
    user: String,
    createdAt: {type: Date, default: Date.now},
    artists: Array,
    tracks: Array
});

module.exports = mongo.model('Top', topSchema);