const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KomentarSchema = new Schema({
    body: String
});

module.exports = mongoose.model('Komentar', KomentarSchema);