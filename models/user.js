const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Other Modules
const passportLocalMongoose = require('passport-local-mongoose')


const UserSchema = new Schema({
    email: {
        type:String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);