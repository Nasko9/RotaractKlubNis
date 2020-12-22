const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AkcijaSchema = new Schema({
    title: String,
    introduction: String,
    description: String,
    date: String
});

module.exports = mongoose.model('Akcija', AkcijaSchema);