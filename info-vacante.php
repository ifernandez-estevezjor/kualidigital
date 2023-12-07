<?php

$recipient_email    = "test@kualidigital.com"; //recepient
$subject         = "Formulario de Contacto Vacantes"; //from email using site domain.

if($_POST){
	
    //php validation, exit outputting json string
    /*if(empty($_POST["nombreCompleto"])){
        print 'Name';
        exit;
    }
    if(empty($_POST["areaInteres"])){
        print 'Area';
        exit;
    }
    if(empty($_POST["estado"])){
        print 'Estado';
        exit;
    }
    if(empty($_POST["subject"])){ //check emtpy subject
        print 'Subject is required';
        exit;
    }*/

    $nombreCompleto    = filter_var($_POST["nombreCompleto"], FILTER_SANITIZE_STRING); //capture sender name
    $areaInteres   = filter_var($_POST["areaInteres"], FILTER_SANITIZE_STRING); //capture sender email
    //$phone_number   = filter_var($_POST["phone"], FILTER_SANITIZE_NUMBER_INT);
    $estado        = filter_var($_POST["estado"], FILTER_SANITIZE_STRING);
    $subject        = filter_var($_POST["subject"], FILTER_SANITIZE_STRING);
   // $message        = filter_var($_POST["message"], FILTER_SANITIZE_STRING); //capture message

    $attachments = $_FILES['my_files'];
    
    $file_count = count($attachments['name']); //count total files attached
    $boundary = md5("sanwebe.com"); 
    
    //construct a message body to be sent to recipient
    $message_body =  "Mensaje del Formulario de Vacantes\n";
    $message_body .=  "------------------------------------\n";
    $message_body .=  "Nombre: $nombreCompleto\n";
    $message_body .=  "Area de Interes: $areaInteres\n";
    $message_body .=  "Estado: $estado\n";
    
    if($file_count > 0){ //if attachment exists
        //header
        $headers = "MIME-Version: 1.0\r\n"; 
        $headers .= "From:".$subject."\r\n"; 
        //$headers .= "Reply-To: ".$sender_email."" . "\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary = $boundary\r\n\r\n"; 
        
        //message text
        $body = "--$boundary\r\n";
        $body .= "Content-Type: text/plain; charset=ISO-8859-1\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n\r\n"; 
        $body .= chunk_split(base64_encode($message_body)); 

        //attachments
        for ($x = 0; $x < $file_count; $x++){       
            if(!empty($attachments['name'][$x])){
                
                if($attachments['error'][$x]>0) //exit script and output error if we encounter any
                {
                    $mymsg = array( 
                    1=>"The uploaded file exceeds the upload_max_filesize directive in php.ini", 
                    2=>"The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form", 
                    3=>"The uploaded file was only partially uploaded", 
                    4=>"No file was uploaded", 
                    6=>"Missing a temporary folder" ); 
                    print  $mymsg[$attachments['error'][$x]]; 
                    exit;
                }
                
                //get file info
                $file_name = $attachments['name'][$x];
                $file_size = $attachments['size'][$x];
                $file_type = $attachments['type'][$x];
                
                //read file 
                $handle = fopen($attachments['tmp_name'][$x], "r");
                $content = fread($handle, $file_size);
                fclose($handle);
                $encoded_content = chunk_split(base64_encode($content)); //split into smaller chunks (RFC 2045)
                
                $body .= "--$boundary\r\n";
                $body .="Content-Type: $file_type; name=".$file_name."\r\n";
                $body .="Content-Disposition: attachment; filename=".$file_name."\r\n";
                $body .="Content-Transfer-Encoding: base64\r\n";
                $body .="X-Attachment-Id: ".rand(1000,99999)."\r\n\r\n"; 
                $body .= $encoded_content; 
            }
        }

    }else{ //send plain email otherwise
       $headers = "From:".$subject."\r\n".
        "X-Mailer: PHP/" . phpversion();
        $body = $message_body;
    }
        
    $sentMail = mail($recipient_email, $subject, $body, $headers);
    if($sentMail) //output success or failure messages
    {       
        echo "<script type='text/javascript'>alert('Gracias por escribirnos. Uno de nuestros especialistas se pondrá en contacto contigo.');location='index.html';</script>";
        exit;
    }else{
        echo "<script type='text/javascript'>alert('¡ERROR!. Por favor, intenta de nuevo...');location='nosotros.html';</script>";
        exit;
    }
}
?>