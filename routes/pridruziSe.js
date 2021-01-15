var express = require('express');
var router = express.Router();

var nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pridruziSe/pridruziSe', {
    title: 'Pridruži se',
    style: 'pridruziSe.css',//ako neces css samo stavi prazno polje 
    js: 'join_forma.js'
  });
});

router.post('/', (req, res) => {
  let output = `
    <p>Ime: ${req.body.ime}</p>
    <p>Prezime: ${req.body.prezime}</p>
    <p>Email: ${req.body.email}</p>
    <p>
      Koja je vasa motivacija za clanstvo?:  <br>
      ${req.body.motivacija}
    </p>
    <p>
      Kako bi ste poboljsali stanje u drustvu?:  <br>
      ${req.body.stanje}
    </p>
  `

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'email_email',
      pass: 'email_sifra', // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: req.body.email,
    to: 'naskotest@aol.com',
    subject: `Poruka iz kontakt forme`,
    html: output 
  }
  
  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      res.send('error');
    }else{
      res.send('success');
    }
  })
})

module.exports = router;