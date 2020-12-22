var express = require('express');
var methodOverride = require('method-override');

var router = express.Router();


// PATH TO MODELS FILE
var Dogadjaj = require('../models/dogadjaj');

// DOGADJAJI HOMEPAGE
router.get('/', async (req, res, next) => {
  const dogadjaji = await Dogadjaj.find({});
  res.render('dogadjaji/dogadjaji', {
    dogadjaji,
    title: 'Dogadjaji',
    style: 'dogadjaji.css'//ako neces css samo stavi prazno polje 
  });
});

// NOVI DOGADJAJ
router.post('/', async (req, res, next) => {
  const dogadjaj = new Dogadjaj(req.body.dogadjaj);
  await dogadjaj.save();
  res.redirect(`dogadjaji/${dogadjaj._id}`);
});

router.get('/novi_dogadjaj', async (req, res, next) => {
  res.render('dogadjaji/dogadjaj_novi', {
    
    title:'Dodaj novi dogadjaj',
    style:'forma_nova.css'
  })
});

// PRIKAZI DOGADJAJ
router.get('/:id', async (req, res, next) => {
  const dogadjaj = await Dogadjaj.findById(req.params.id);
  res.render('dogadjaji/dogadjaj', {
    dogadjaj,
    title: dogadjaj.title,
    style:'dogadjaj.css'
  });
});


// AZURIRAJ DOGADJAJ
router.get('/:id/edit', async (req, res, next) => {
  const dogadjaj = await Dogadjaj.findById(req.params.id);
  res.render('dogadjaji/dogadjaj_izmena', {
    dogadjaj,
    title: dogadjaj.title,
    style:'forma_izmena.css'
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
  res.redirect(`/dogadjaji`);
});

module.exports = router;