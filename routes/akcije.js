const { request } = require('express');
var express = require('express');
var methodOverride = require('method-override');

var router = express.Router();

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
router.post('/', async (req, res, next) => {
  const akcija = new Akcija(req.body.akcija);
  await akcija.save();
  res.redirect(`akcije/${akcija._id}`);
});

router.get('/nova_akcija', async (req, res, next) => {
  res.render('akcije/akcija_nova', {
    title:'Dodaj novu akciju',
    style:'forma_nova.css',
    js: 'provera_forma.js'
  })
});


// PRIKAZI AKCIJU
router.get('/:id', async (req, res, next) => {
  const akcija = await Akcija.findById(req.params.id).populate('komentari');
  res.render('akcije/akcija', {
    akcija,
    title: akcija.title,
    style:'akcija.css',
    js: 'provera_forma.js'
  });
});

// AZURIRAJ AKCIJU
router.get('/:id/edit', async (req, res, next) => {
  const akcija = await Akcija.findById(req.params.id);
  res.render('akcije/akcija_izmena', {
    akcija,
    title: akcija.title,
    style:'forma_izmena.css',
    js: ''
  });
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const akcija = await Akcija.findByIdAndUpdate(id,{ ...req.body.akcija });
  res.redirect(`/akcije/${akcija._id}`);
});

// OBRISI AKCIJU
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const akcija = await Akcija.findByIdAndDelete(id);
  res.redirect(`/akcije`);
});

//!KOMENTARI
//NOVI KOMENTAR
router.post('/:id/komentari', async (req, res, next) => {
  const akcija = await Akcija.findById(req.params.id);
  const komentar = new Komentar(req.body.komentar);
  akcija.komentari.push(komentar);
  await komentar.save();
  await akcija.save();
  res.redirect(`/akcije/${akcija._id}`);
});

router.delete('/:id/komentari/:komentarId', async (req, res, next) => {
  const { id, komentarId} = req.params;
  await Akcija.findByIdAndUpdate(id, {$pull: {komentari: komentarId}});
  await Komentar.findByIdAndDelete(komentarId);
  res.redirect(`/akcije/${id}`);
});


module.exports = router;