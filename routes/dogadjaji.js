const { request } = require('express');
var express = require('express');
var methodOverride = require('method-override');

var router = express.Router();

// PATH TO MODELS FILE
var Dogadjaj = require('../models/dogadjaj');
var Komentar = require('../models/komentar')

// DOGADJAJI HOMEPAGE
router.get('/', async (req, res, next) => {
  const dogadjaji = await Dogadjaj.find({});
  res.render('dogadjaji/dogadjaji', {
    dogadjaji,
    title: 'Dogadjaji',
    style: 'dogadjaji.css',//ako neces css samo stavi prazno polje
    js: '' 
  });
});

// NOVI DOGADJAJ
router.post('/', async (req, res, next) => {
  const dogadjaj = new Dogadjaj(req.body.dogadjaj);
  await dogadjaj.save();
  req.flash('success', 'Uspešno ste dodali novi događaj');
  res.redirect(`dogadjaji/${dogadjaj._id}`);
});

router.get('/novi_dogadjaj', async (req, res, next) => {
  res.render('dogadjaji/dogadjaj_novi', {
    title:'Dodaj novi dogadjaj',
    style:'forma_nova.css',
    js: 'provera_forma.js'
  })
});

// PRIKAZI DOGADJAJ
router.get('/:id', async (req, res, next) => {
  const dogadjaj = await Dogadjaj.findById(req.params.id).populate('komentari');
  if(!dogadjaj){
    req.flash('error', 'Događaj nije pronađen');
    return res.redirect('/dogadjaji');
  }
  res.render('dogadjaji/dogadjaj', {
    dogadjaj,
    title: dogadjaj.title,
    style:'dogadjaj.css',
    js: 'provera_forma.js'
  });
});

// AZURIRAJ DOGADJAJ
router.get('/:id/edit', async (req, res, next) => {
  const dogadjaj = await Dogadjaj.findById(req.params.id);
  if(!dogadjaj){
    req.flash('error', 'Događaj nije pronađen');
    return res.redirect('/dogadjaji');
  }
  res.render('dogadjaji/dogadjaj_izmena', {
    dogadjaj,
    title: dogadjaj.title,
    style:'forma_izmena.css',
    js: ''
  });
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const dogadjaj = await Dogadjaj.findByIdAndUpdate(id,{ ...req.body.dogadjaj });
  res.redirect(`/dogadjaji/${dogadjaj._id}`);
});

// OBRISI DOGADJAJ
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const dogadjaj = await Dogadjaj.findByIdAndDelete(id);
  req.flash('success', 'Uspešno ste obrisali događaj');
  res.redirect(`/dogadjaji`);
});

//!KOMENTARI
//NOVI KOMENTAR
router.post('/:id/komentari', async (req, res, next) => {
  const dogadjaj = await Dogadjaj.findById(req.params.id);
  const komentar = new Komentar(req.body.komentar);
  dogadjaj.komentari.push(komentar);
  await komentar.save();
  await dogadjaj.save();
  res.redirect(`/dogadjaji/${dogadjaj._id}`);
});

router.delete('/:id/komentari/:komentarId', async (req, res, next) => {
  const { id, komentarId} = req.params;
  await Dogadjaj.findByIdAndUpdate(id, {$pull: {komentari: komentarId}});
  await Komentar.findByIdAndDelete(komentarId);
  req.flash('success', 'Uspešno ste obrisali komentar');
  res.redirect(`/dogadjaji/${id}`);
});


module.exports = router;