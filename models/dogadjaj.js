const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DogadjajSchema = new Schema({
    title: String,
    introduction: String,
    description: String,
    date: String
});

module.exports = mongoose.model('Dogadjaj', DogadjajSchema);