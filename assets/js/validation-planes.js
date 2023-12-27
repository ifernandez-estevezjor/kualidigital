const nombreCompletoEl = document.querySelector('#nombreCompleto');
const telCelularEl = document.querySelector('#telCelular');
const estadoEl = document.querySelector('#estado');
const municipioEl = document.querySelector('#municipio');
const coloniaLocalidadEl = document.querySelector('#coloniaLocalidad');
const form = document.querySelector('#signup');

const checknombreCompleto = () => {
    let valid = false;
    const max = 10;
    const nombreCompleto = nombreCompletoEl.value.trim();

    if (!isRequired(nombreCompleto)) {
        showError(nombreCompletoEl, 'Escribe tu Nombre Completo.');
    } else if (!isBetween(nombreCompleto.length, max)) {
        showError(nombreCompletoEl, `El nombre debe tener al menos ${max} caracteres.`)
    } else {
        showSuccess(nombreCompletoEl);
        valid = true;
    }
    return valid;
};

const checktelCelular = () => {
    let valid = false;
    const max = 10;
    const telCelular = telCelularEl.value.trim();

    if (!isRequired(telCelular)) {
        showError(telCelularEl, 'Escribe tu Número de Celular.');
    } else if (!isBetween(telCelular.length, max)) {
        showError(telCelularEl, `Tu Número de Celular debe tener ${max} caracteres.`)
    } else {
        showSuccess(telCelularEl);
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

const checkmunicipio = () => {
    let valid = false;
    const municipio = municipioEl.value.trim();

    if (!isRequired(municipio)) {
        showError(municipioEl, 'Selecciona un Municipio.');
    } else {
        showSuccess(municipioEl);
        valid = true;
    }
    return valid;
};

const checkcoloniaLocalidad = () => {
    let valid = false;
    const coloniaLocalidad = coloniaLocalidadEl.value.trim();

    if (!isRequired(coloniaLocalidad)) {
        showError(coloniaLocalidadEl, 'Escribe tu Colonia o Localidad.');
    } else {
        showSuccess(coloniaLocalidadEl);
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

    // validate forms
    let isnombreCompletoValid = checknombreCompleto(),
        istelCelularValid = checktelCelular(),
        isestadoValid = checkestado(),
        ismunicipioValid = checkmunicipio(),
        iscoloniaLocalidad = checkcoloniaLocalidad();

    let isFormValid = isnombreCompletoValid &&
        istelCelularValid &&
        isestadoValid &&
        ismunicipioValid &&
        iscoloniaLocalidad;

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
// 
form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'nombreCompleto':
            checknombreCompleto();
            break;
        case 'telCelular':
            checktelCelular();
            break;
        case 'estado':
            checkestado();
            break;
        case 'municipio':
            checkmunicipio();
            break;
        case 'coloniaLocalidad':
            checkcoloniaLocalidad();
            break;
    }
}));