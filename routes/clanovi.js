var express = require('express');
var methodOverride = require('method-override');

var router = express.Router();

//PATH TO UTILS FILES
const ExpressError = require('../utils/ExpressError');

//PATH TO MIDDLEWARE FILE
const {isLoggedIn} = require('../middleware/UserMiddleware');

// PATH TO MODELS FILE
var Clan = require('../models/clan');

// CLANOVI HOMEPAGE
router.get('/', async (req, res, next) => {
  const clanovi = await Clan.find({});
  res.render('clanovi/clanovi', {
    clanovi,
    title: 'Clanovi',
    style: 'clanovi.css',//ako neces css samo stavi prazno polje 
    js: ''
  });
});

// NOVI CLAN 
router.post('/', isLoggedIn, async (req, res, next) => {
  const clan = new Clan(req.body.clan);
  await clan.save();
  req.flash('success', 'Uspešno ste dodali novog člana');
  res.redirect(`clanovi/${clan._id}`);
});

router.get('/novi_clan', isLoggedIn, async (req, res, next) => {
  res.render('clanovi/clan_novi', {
    title:'Dodaj novog clana',
    style:'forma_nova.css',
    js: 'provera_forma.js'
  });
});

// PRIKAZI CLANA
router.get('/:id', async (req, res, next) => {
  const clan = await Clan.findById(req.params.id);
  if(!clan){
    req.flash('error', 'Član nije pronađen');
    return res.redirect('/clanovi');
  }
  res.render('clanovi/clan', {
    clan,
    title: clan.title,
    style:'clan.css',
    js: ''
  });
});

// AZURIRAJ CLANA
router.get('/:id/edit', isLoggedIn, async (req, res, next) => {
  const clan = await Clan.findById(req.params.id);
  if(!clan){
    req.flash('error', 'Član nije pronađen');
    return res.redirect('/clanovi');
  }
  res.render('clanovi/clan_izmena', {
    clan,
    title: clan.title,
    style:'forma_izmena.css',
    js:''
  });
});

router.put('/:id', isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const clan = await Clan.findByIdAndUpdate(id,{ ...req.body.clan });
  res.redirect(`/clanovi/${clan._id}`);
});

// OBRISI CLANA
router.delete('/:id', isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const clan = await Clan.findByIdAndDelete(id);
  req.flash('success', 'Uspešno ste obrisali člana');
  res.redirect(`/clanovi`);
});

module.exports = router;
