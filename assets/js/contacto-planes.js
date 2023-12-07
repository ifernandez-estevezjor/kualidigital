function validate(){  
    var name = document.f1.name.value;
    var mobile = document.f1.mobile.value.length;
    var zipcode = document.f1.zipcode.value.length;
    var status = false;

    if(name == ""){  
        document.getElementById("nameinput").innerHTML = "Escribe tu Nombre Completo.";  
        status = false;
    }else{  
        document.getElementById("nameinput").innerHTML = "OK";  
        status = true;
    }
    
    if(mobile<10){  
        document.getElementById("mobileinput").innerHTML = "Escribe tu Número de Teléfono.";  
        status=false; 
    }else{  
        document.getElementById("mobileinput").innerHTML = "OK";  
    }
    
    if(zipcode<5){  
        document.getElementById("zipcodeinput").innerHTML = "Escribe tu Código Postal.";  
        tatus=false; 
    }else{  
        document.getElementById("zipcodeinput").innerHTML = "OK";  
    }
    
    return status;  
}