const nombreCompletoEl = document.querySelector('#nombreCompleto');
const areaInteresEl = document.querySelector('#areaInteres');
const estadoEl = document.querySelector('#estado');
const adjuntoEl = document.querySelector('#adjunto');
const form = document.querySelector('#signup');

const checknombreCompleto = () => {
    let valid = false;
    const min = 3, max = 100;
    const nombreCompleto = nombreCompletoEl.value.trim();

    if (!isRequired(nombreCompleto)) {
        showError(nombreCompletoEl, 'Escribe tu Nombre Completo.');
    } else if (!isBetween(nombreCompleto.length, min, max)) {
        showError(nombreCompletoEl, `Tu nombre debe tener ${min} y ${max} caracteres.`)
    } else {
        showSuccess(nombreCompletoEl);
        valid = true;
    }
    return valid;
};

const checkareaInteres = () => {
    let valid = false;
    const areaInteres = areaInteresEl.value.trim();

    if (!isRequired(areaInteres)) {
        showError(areaInteresEl, 'Selecciona el área a postularte.');
    } else {
        showSuccess(areaInteresEl);
        valid = true;
    }
    return valid;
};

const checkestado = () => {
    let valid = false;
    const estado = estadoEl.value.trim();

    if (!isRequired(estado)) {
        showError(estadoEl, 'Selecciona un Estado.');
    } else {
        showSuccess(estadoEl);
        valid = true;
    }
    return valid;
};

const checkadjunto = () => {
    let valid = false;
    const adjunto = adjuntoEl.value.trim();

    if (!isRequired(adjunto)) {
        showError(adjuntoEl, 'Adjunta un archivo para enviar.');
    } else {
        showSuccess(adjuntoEl);
        valid = true;
    }
    return valid;
};

function validation()
{
    var checkbox = document.getElementById("avisoPrivacidad");
    if (!checkbox.checked){
    document.getElementById("errorPrivacidad").innerHTML = "Por favor, acepta el Aviso de Privacidad.";
    return false;
    }
    document.getElementById("successPrivacidad").innerHTML = "¡Gracias!";
    return true;
}

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isnombreCompletoValid = checknombreCompleto(),
        isareaInteresValid = checkareaInteres(),
        isestadoValid = checkestado(),
        isadjuntoValid = checkadjunto();

    let isFormValid = isnombreCompletoValid &&
        isareaInteresValid &&
        isestadoValid &&
        isadjuntoValid;

    // submit to the server if the form is valid
    if (isFormValid) {
        form.submit();
    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'nombreCompleto':
            checknombreCompleto();
            break;
        case 'areaInteres':
            checkareaInteres();
            break;
        case 'estado':
            checkestado();
            break;
        case 'adjunto':
            checkadjunto();
            break;
    }
}));