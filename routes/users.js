const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync')
const User = require('../models/user');
const passport = require('passport');

// ADMIN REGISTER
router.get('/register_admin', (req, res) => {
    res.render('users/admin_register', {
        title: 'Registracija admina',
        style: 'login.css',
        js: 'provera_forma.js'
    });
});

// USERS REGISTER
router.get('/register', (req, res) => {
    res.render('users/register', {
        title: 'Registracija',
        style: 'login.css',
        js: 'provera_forma.js'
    });
});

router.post('/register', catchAsync( async (req, res) => {
    try{
        const {email, username, password} = req.body;
        const user = new User({email, username});
        if(req.body.adminCode === 'admin1234'){
            user.isAdmin = true;
        }
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) {
                return next(err);
            }
            req.flash('success', 'Uspesno ste registrovali novog admina');
            res.redirect('/akcije');
        });
    }
    catch(e){
        req.flash('error', e.message);
        res.redirect('register');
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login', {
        title: 'Login',
        style: 'login.css',
        js: 'provera_forma.js'
    });
});

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('succes', 'Uspesno ste se prijavili');
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl)
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Uspesno ste se odjavili');
    res.redirect('/login');
})

module.exports = router;