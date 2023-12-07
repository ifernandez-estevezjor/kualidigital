$(document).ready(function(){
    var arr = ['*Área de Interés','Call Center','Cobranza','Compras','Ingeniería','Marketing','Recursos Humanos','Redes','Servicios Generales','Sistemas','Instalaciones','Ventas'];
    
    sale = '<select name="" disabled selected>';
    for(i=0; i < arr.length; i++){
        sale += '<option value="'+arr[i]+'">'+arr[i]+'</option>';
    };
    sale += '</select>';
    $("#areaInteres").html(sale);
})