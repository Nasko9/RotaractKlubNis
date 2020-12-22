var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pocetna/pocetna', {
    title: 'Pocetna',
    style: 'pocetna.css'
  });
});

module.exports = router;
