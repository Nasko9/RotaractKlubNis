const { request } = require('express');
var express = require('express');
var methodOverride = require('method-override');
var multer = require('multer');

var router = express.Router();

//Multer config
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/images/akcije');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
})

var upload = multer({ storage: storage })

//PATH TO UTILS FILES
const ExpressError = require('../utils/ExpressError');

//PATH TO MIDDLEWARE FILE
const {isLoggedIn, isKomentarAuthor} = require('../middleware/UserMiddleware');

// PATH TO MODELS FILE
var Akcija = require('../models/akcija');
var Komentar = require('../models/komentar');

// AKCIJE HOMEPAGE
router.get('/', async (req, res, next) => {
  const akcije = await Akcija.find({});
  res.render('akcije/akcije', {
    akcije,
    title: 'Akcije',
    style: 'akcije.css',//ako neces css samo stavi prazno polje 
    js: ''
  });
});

// NOVA AKCIJA
router.post('/', isLoggedIn, upload.single('akcija[image]'), async (req, res, next) => {
  try{
    const akcija = new Akcija(req.body.akcija);
    akcija.image = req.file.filename;
    await akcija.save();
    req.flash('success', 'Uspešno ste dodali novu akciju');
    res.redirect(`akcije/${akcija._id}`);
  }
  catch (err){
    next(err);
  }
});

router.get('/nova_akcija', isLoggedIn, async (req, res, next) => {
  res.render('akcije/akcija_nova', {
    title:'Dodaj novu akciju',
    style:'forma_nova.css',
    js: 'provera_forma.js'
  });
});

// PRIKAZI AKCIJU
router.get('/:id', async (req, res, next) => {
  const akcija = await Akcija.findById(req.params.id).populate({path: 'komentari', populate: {path: 'author'}});
  if(!akcija){
    req.flash('error', 'Akcija nije pronađena');
    return res.redirect('/akcije');
  }
  res.render('akcije/akcija', {
    akcija,
    title: akcija.title,
    style:'akcija.css',
    js: 'provera_forma.js'
  });
});

// AZURIRAJ AKCIJU
router.get('/:id/edit', isLoggedIn, async (req, res, next) => {
  const akcija = await Akcija.findById(req.params.id);
  if(!akcija){
    req.flash('error', 'Akcija nije pronađena');
    return res.redirect('/akcije');
  }
  res.render('akcije/akcija_izmena', {
    akcija,
    title: akcija.title,
    style:'forma_izmena.css',
    js: ''
  });
});

router.put('/:id', isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const akcija = await Akcija.findByIdAndUpdate(id,{ ...req.body.akcija });
  req.flash('success', 'Uspešno ste izvršili izmenu');
  res.redirect(`/akcije/${akcija._id}`);
});

// OBRISI AKCIJU
router.delete('/:id', isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const akcija = await Akcija.findByIdAndDelete(id);
  req.flash('success', 'Uspešno ste obrisali akciju');
  res.redirect(`/akcije`);
});

//!KOMENTARI
//NOVI KOMENTAR
router.post('/:id/komentari', isLoggedIn, async (req, res, next) => {
  const akcija = await Akcija.findById(req.params.id);
  const komentar = new Komentar(req.body.komentar);
  komentar.author = req.user._id;
  akcija.komentari.push(komentar);
  await komentar.save();
  await akcija.save();
  res.redirect(`/akcije/${akcija._id}`);
});

router.delete('/:id/komentari/:komentarId', isLoggedIn, isKomentarAuthor, async (req, res, next) => {
  const { id, komentarId} = req.params;
  await Akcija.findByIdAndUpdate(id, {$pull: {komentari: komentarId}});
  await Komentar.findByIdAndDelete(komentarId);
  req.flash('success', 'Uspešno ste obrisali komentar');
  res.redirect(`/akcije/${id}`);
});

module.exports = router;