const mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Defining Schema for our token database
var tokenSchema = new Schema({
    id_token: String,
    access_token: String,
    expires_at: Number,
    token_type: String,
    refresh_token: String,
    scope: String
});
const token = mongoose.model('token', tokenSchema);
const tokenset = mongoose.model('tokenset', tokenSchema);
module.exports = token;