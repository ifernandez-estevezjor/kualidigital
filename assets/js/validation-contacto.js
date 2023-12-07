const nombreCompletoEl = document.querySelector('#nombreCompleto');
const telCelularEl = document.querySelector('#telCelular');
const estadoEl = document.querySelector('#estado');
const municipioEl = document.querySelector('#municipio');
const motivoConsultaEl = document.querySelector('#motivoConsulta');
const messageEl = document.querySelector('#message');
const form = document.querySelector('#signup');

const checknombreCompleto = () => {
    let valid = false;
    const min = 3, max = 100;
    const nombreCompleto = nombreCompletoEl.value.trim();

    if (!isRequired(nombreCompleto)) {
        showError(nombreCompletoEl, 'Escribe tu Nombre Completo.');
    } else if (!isBetween(nombreCompleto.length, min, max)) {
        showError(nombreCompletoEl, `Tu nombre debe tener ${min} and ${max} caracteres.`)
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

const checkmotivoConsulta = () => {
    let valid = false;
    const motivoConsulta = motivoConsultaEl.value.trim();

    if (!isRequired(motivoConsulta)) {
        showError(motivoConsultaEl, 'Selecciona una opción de la lista.');
    } else {
        showSuccess(motivoConsultaEl);
        valid = true;
    }
    return valid;
};

const checkmessage = () => {
    let valid = false;
    const min = 10, max = 500;
    const message = messageEl.value.trim();

    if (!isRequired(message)) {
        showError(messageEl, 'Escribe tu Mensaje.');
    } else if (!isBetween(message.length, min, max)) {
        showError(messageEl, `Tu Mensaje debe tener ${min} y ${max} caracteres.`)
    } else {
        showSuccess(messageEl);
        valid = true;
    }
    return valid;
};

document.contact.onsubmit=function(){
    if(this.contacto[0].checked==false && this.contacto[1].checked==false){
        document.getElementById("errorContacto").innerHTML = "Elige una opción de contacto.";
        return false;
    }
    else{
        document.getElementById("successContacto").innerHTML = "¡Gracias!";
 return true;
    }
}

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
        istelCelularValid = checktelCelular(),
        isestadoValid = checkestado(),
        ismunicipioValid = checkmunicipio(),
        ismotivoConsultaValid = checkmotivoConsulta(),
        ismessageValid = checkmessage();

    let isFormValid = isnombreCompletoValid &&
        istelCelularValid &&
        isestadoValid &&
        ismunicipioValid &&
        ismotivoConsultaValid &&
        ismessageValid;

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
        case 'telCelular':
            checktelCelular();
            break;
        case 'estado':
            checkestado();
            break;
        case 'municipio':
            checkmunicipio();
            break;
        case 'motivoConsulta':
            checkmotivoConsulta();
            break;
        case 'message':
            checkmessage();
            break;
    }
}));