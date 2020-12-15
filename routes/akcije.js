var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('akcije/akcije', {
    title: 'Akcije',
    style: 'akcije.css'//ako neces css samo stavi prazno polje 
  });
});

module.exports = router;