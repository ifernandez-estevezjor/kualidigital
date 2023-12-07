<?php

if (isset($_POST['submitForm'])) {
    $captcha_response = true;
    $recaptcha = $_POST['g-recaptcha-response'];

    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = array(
        'secret' => '6LcLyLQnAAAAALD1HeMPPxnNmDtqtacKjUJw6Lt1',
        'response' => $recaptcha
    );
    $options = array(
        'http' => array(
            'method' => 'POST',
            'content' => http_build_query($data)
        )
    );
    $context  = stream_context_create($options);
    $verify = file_get_contents($url, false, $context);
    $captcha_success = json_decode($verify);
    $captcha_response = $captcha_success->success;

    if ($captcha_response) {
        echo '<p class="alert alert-success">Procesar datos...</p>';
    } else {
        echo '<p class="alert alert-danger">Debes indicar que no eres un robot.';
    }
}

header('Content-Type: text/html; charset=UTF-8');

$nombreCompleto = $_POST['nombreCompleto'];
$numContrato = $_POST['numContrato'];
$telCelular = $_POST['telCelular'];
$telOtro = $_POST['telOtro'];
$estado = $_POST['estado'];
$municipio = $_POST['municipio'];
$coloniaLocalidad = $_POST['coloniaLocalidad'];
$codigoPostal = $_POST['codigoPostal'];
$motivoConsulta = $_POST['motivoConsulta'];
$message = $_POST['message'];
$contacto = $_POST['contacto'];
$avisoPrivacidad = $_POST['avisoPrivacidad'];
$subject = $_POST['subject'];

$destinatario = 'test@kualidigital.com';
$asunto = 'Formulario de Contacto';
$cuerpo = "Nombre Completo: $nombreCompleto\nNo. Contrato: $numContrato\nTelefono Celular: $telCelular\nTelefono Adicional: $telOtro\nEstado: $estado\nMunicipio: $municipio\nColonia o Localidad: $coloniaLocalidad\nCodigo Postal: $codigoPostal\nMotivo Consulta: $motivoConsulta\nMensaje: $message\nMedio de Contacto: $contacto\nAviso de Privacidad: $avisoPrivacidad";
$headers = "From: $subject\r\nReply-To: $subject\r\n";

mail($destinatario, $asunto, $cuerpo, $headers);

/*header('Location: contacto-soporte.html');*/
echo "<script type='text/javascript'>alert('Gracias por escribirnos. Uno de nuestros especialistas se pondrá en contacto contigo.');location='index.html';</script>";
