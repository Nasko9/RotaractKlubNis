const mongoose = require('mongoose');
const Komentar = require('./komentar');
const Schema = mongoose.Schema;

const AkcijaSchema = new Schema({
    title: String,
    introduction: String,
    description: String,
    date: String,
    komentari: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Komentar'
        }
    ]
});

//Kad obrisem akciju, brisem i sve komentare vezane za istu
AkcijaSchema.post('findOneAndDelete', async function(doc) {
    if(doc){
        await Komentar.remove({
            _id: {
                $in: doc.komentari
            }
        })
    }
});

module.exports = mongoose.model('Akcija', AkcijaSchema);