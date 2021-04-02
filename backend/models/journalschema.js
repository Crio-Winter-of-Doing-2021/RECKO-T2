const mongoose = require('mongoose');
// const mongoosePaginate = require('mongoose-paginate-v2');
const journalschema = new mongoose.Schema({
    Provider: String,
    Org: String,
    Account_name: String,
    Account_id: String,
    Amount: Number,
    Date: String,
    Type: String
});
// journalschema.plugin(mongoosePaginate);
const journal = mongoose.model('journal', journalschema);
module.exports = journal;