//<reference path="libs/jquery/index.d.ts"/>
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "./admin.php",
        dataType: "text",
        data: { caso: "listado" },
        async: true
    })
        .done(function (jsonRecibido) {
        var tabla = '<table class="table table-hover"><tr><td>ID</td><td>APELLIDO</td><td>NOMBRE</td><td>E-MAIL</td><td>FOTO</td><td>LEGAJO</td><td>PERFIL</td></tr>';
        var jsonMuestro = JSON.parse(jsonRecibido);
        console.log("Se muestra lista de empleados en pantalla.");
        for (var i = 0; i < jsonMuestro.length; i++) {
            tabla += "<tr><td>" + jsonMuestro[i].id + "</td><td>" + jsonMuestro[i].apellido + "</td><td>" + jsonMuestro[i].nombre + "</td><td>" + jsonMuestro[i].email + ("</td><td><img src=\"./img/" + jsonMuestro[i].foto + "\" width='50px' height='50px'></td>") + "</td><td>" + jsonMuestro[i].legajo + "</td>" + "</td><td>" + jsonMuestro[i].perfil + "</td>";
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
        data: { caso: "listado" },
        async: true
    })
        .done(function (jsonRecibido) {
        var tabla = '<table class="table table-hover"><tr><td>ID</td><td>NOMBRE</td><td>PRECIO</td><td class="text-center">ACCION</td></tr>';
        var jsonMuestro = JSON.parse(jsonRecibido);
        console.log("Se muestra lista de productos en pantalla.");
        for (var i = 0; i < jsonMuestro.length; i++) {
            tabla += "<tr><td>" + jsonMuestro[i].id + "</td><td>" + jsonMuestro[i].nombre + "</td><td>" + jsonMuestro[i].precio + '</td><td class="text-center"><input type="button" class="btn btn-danger" value="Eliminar">';
            tabla += '<input type="button" class="btn btn-info" value="Modificar"></td></tr>';
        }
        tabla += "</table>";
        $("#divProductos").html(tabla);
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });

$("#productoForm").bootstrapValidator(
    
            {
                framework: 'bootstrap',
                icon:
                {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields:
                {
                    nombre:
                    {
                        validators:
                        {
                            notEmpty:
                            {
                                message: 'Campo vacio'
                            },
                            stringLength:
                            {
                                min: 3,
                                max: 15,
                                message: "El nombre debe contener entre 3 y 15 caracteres"
                            }
                        }
                    },
                    precio:
                    {
                            validators:
                            {
                                notEmpty:
                                {
                                    message: 'Campo vacio'
                                },
                                integer:
                                {
                                    message: "Debe ser numerico"
                                }
                            }
                    }
                }
            }
).on('success.form.bv', function (form) {
    form.preventDefault();
    
    var formData = new FormData($(this)[0]);
    formData.append("caso","login");
    $.ajax({
        url: "./admin.php/productos",
        type: "POST",
        data: formData,
        dataType: 'text'
        // async: true
    }).done(function (res) {
        console.log(res);
    }).fail(function (res) {
        alert("error " + res);
    });
});

});