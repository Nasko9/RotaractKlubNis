var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('istorija/istorija', {
    title: 'Istorija kluba',
    style: 'istorija.css',//ako neces css samo stavi prazno polje 
    js: ''
  });
});

module.exports = router;
