const mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Defining Schema for our user reg database
var userRegisterSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String
});
const user = mongoose.model('user', userRegisterSchema);
module.exports = user;