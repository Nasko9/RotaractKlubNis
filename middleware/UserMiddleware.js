
const ExpressError = require('../utils/ExpressError');

//PATH TO MODELS FILE
const Akcija = require('../models/akcija');
const Dogadjaj = require('../models/dogadjaj');
const Komentar = require('../models/komentar');
const User = require('../models/user');


module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'Morate biti ulgovani');
        return res.redirect('/login');
    }
    next();
}

module.exports.isKomentarAuthor = async (req, res, next) => {
    const { id, komentarId } = req.params;
    const komentar = await Komentar.findById(komentarId);
    if(komentar.author.equals(req.user._id) || req.user.isAdmin){
        next();
    }
    else {
        req.flash('error', 'Nisi autor komentara');
        return res.redirect(`/`);
    }
    
}