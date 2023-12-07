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

$planes = $_POST['planes'];
$NombreCompleto = $_POST['NombreCompleto'];
$cargo = $_POST['cargo'];
$email = $_POST['email'];
$empresa = $_POST['empresa'];
$TelCelular = $_POST['TelCelular'];
$TelNumero = $_POST['TelNumero'];
$extension = $_POST['extension'];
$estado = $_POST['estado'];
$municipio = $_POST['municipio'];
$subject = $_POST['subject'];

$destinatario = 'test@kualidigital.com';
$asunto = 'Formulario de Contacto Empresarial';
$cuerpo = "Plan: $planes\nNombre Completo: $NombreCompleto\nCargo: $cargo\nEmail: $email\nEmpresa: $empresa\nTelefono Celular: $TelCelular\nNumero Telefono: $TelNumero\nExtension: $extension\nEstado: $estado\nMunicipio: $municipio";
$headers = "From: $subject\r\nReply-To: $subject\r\n";

mail($destinatario, $asunto, $cuerpo, $headers);

/*header('Location: contacto-soporte.html');*/
echo "<script type='text/javascript'>alert('Gracias por escribirnos. Uno de nuestros especialistas se pondrá en contacto contigo.');location='index.html';</script>";
