var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pridruziSe/pridruziSe', {
    title: 'Pridruži se',
    style: 'pridruziSe.css',//ako neces css samo stavi prazno polje 
    js: 'provera_forma.js'
  });
});

module.exports = router;