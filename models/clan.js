const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClanSchema = new Schema({
    title: String,
    funkcija: String,
    osnovne_informacije: String,
    rotaract_iskustvo: String,
    obrazovanje: String,
    radno_iskustvo: String,
    interesovanja: String,
    image: {
        type: String,
        default: ' '
    },
});

module.exports = mongoose.model('Clan', ClanSchema);