///<reference path="libs/jquery/index.d.ts"/>

$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "./admin.php",
        dataType: "text",
        data:{caso:"listado"},
        async: true
    })
        .done(function (jsonRecibido) {
           
            let tabla: string = '<table class="table table-hover"><tr><td>ID</td><td>APELLIDO</td><td>NOMBRE</td><td>E-MAIL</td><td>FOTO</td><td>LEGAJO</td><td>PERFIL</td></tr>';
            let jsonMuestro: any[] = JSON.parse(jsonRecibido);
            console.log("Se muestra lista de empleados en pantalla.");
            for (var i = 0; i < jsonMuestro.length; i++) {
                tabla += "<tr><td>" + jsonMuestro[i].id + "</td><td>" + jsonMuestro[i].apellido + "</td><td>" + jsonMuestro[i].nombre + "</td><td>" + jsonMuestro[i].email + `</td><td><img src="./img/${jsonMuestro[i].foto}" width='50px' height='50px'></td>`+ "</td><td>" + jsonMuestro[i].legajo + `</td>`+ "</td><td>" + jsonMuestro[i].perfil + `</td>`;
                
            }
            tabla += "</table>";
            $("#divTabla").html(tabla);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            
        });
    
        $.ajax({
            type: "GET",
            url: "./admin.php/productos",
            dataType: "text",
            data:{caso:"listado"},
            async: true
        })
            .done(function (jsonRecibido) {
               
                let tabla: string = '<table class="table table-hover"><tr><td>ID</td><td>NOMBRE</td><td>PRECIO</td></tr>';
                let jsonMuestro: any[] = JSON.parse(jsonRecibido);
                console.log("Se muestra lista de productos en pantalla.");
                for (var i = 0; i < jsonMuestro.length; i++) {
                    tabla += "<tr><td>" + jsonMuestro[i].id + "</td><td>" + jsonMuestro[i].nombre + "</td><td>" + jsonMuestro[i].precio + `</td></tr>`;
                    
                }
                tabla += "</table>";
                $("#divProductos").html(tabla);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                
            });
    
    });

$("#productoForm").on('success.form.bv', function (form) {

    form.preventDefault();
    let datosForm:any=$(this)[0];
    console.log(datosForm);
    let formData=new FormData(datosForm);
            $.ajax({
                url:"./admin.php/productos",
                type:"POST",
                data:formData,
                dataType:'text',
                async: true
            }).done(function(res){
                console.log(res);
                
                }).fail(function (res){
    
                    alert("error "+res);
                });

});

