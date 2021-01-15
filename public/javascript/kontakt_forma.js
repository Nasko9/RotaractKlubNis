//Provera forme
   (function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

//KONTAKT SETUP
const kontaktForma = document.querySelector('#kontakt');
let ime = document.getElementById('ime')
let prezime = document.getElementById('prezime');
let email = document.getElementById('email');
let poruka = document.getElementById('poruka');


kontaktForma.addEventListener('submit', (e)=>{
    e.preventDefault();

    let formData = {
        ime: ime.value,
        prezime: prezime.value,
        email: email.value,
        poruka: poruka.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/kontakt');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
        if(xhr.responseText == 'success'){
            alert('Email jeuspesno poslat');
            ime.value = '';
            prezime.value = '';
            email.value = '';
            poruka.value = '';
        } else{
            alert('Nesto nije uredu');
        }
    }

    xhr.send(JSON.stringify(formData));
});