$(document).ready(function(){

    var estados = "<option style='color:black;' value='' disabled selected>*Estado</option>";

    for (var key in municipios) {
        if (municipios.hasOwnProperty(key)) {
            estados = estados + "<option style='color:black;' value='" + key + "'>" + key + "</option>";
        }
    }

    $('#estado').html(estados);

    $( "#estado" ).change(function() {
        var html = "<option style='color:black;' value='' disabled selected>*Municipio</option>";
        $( "#estado option:selected" ).each(function() {
            var estado = $(this).text();
            if(estado != "*Estado"){
                var municipio = municipios[estado];
                for (var i = 0; i < municipio.length; i++)
                    html += "<option style='color:black;' value='" + municipio[i] + "'>" + municipio[i] + "</option>";
            }
        });
        $('#municipio').html(html);
        $('select').select('update');
    })
    .trigger( "change" );
});