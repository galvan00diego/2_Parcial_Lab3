$(document).ready(function () {
    $("#formRegistro").bootstrapValidator(

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
                foto:
                {
                    validators:
                    {
                        notEmpty:
                        {
                            message: 'Por favor seleccione una imagen'
                        },
                        file:
                        {
                            extension: 'jpg,png',
                            type: 'image/jpeg,image/png',
                            message: 'El archivo seleccionado no es valido'
                        },
                        file:
                        {
                            maxSize:850000,
                            message:'El archivo es demasiado grande. (Maximo 850kb)'
                        }
                    }
                },
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
                            max: 10,
                            message: "El nombre no debe contener mas de 10 caracteres"
                        }
                    }
                },
                apellido:
                {
                    validators:
                    {
                        notEmpty:
                        {
                            message: 'Campo vacio'
                        },
                        stringLength:
                        {
                            max: 15,
                            message: "El apellido no debe contener mas de 15 caracteres"
                        }
                    }
                },
                legajo:
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
                            },
                            stringLength:
                            {
                                min:3,
                                max: 6,
                                message: "Debe ser un número entero de entre 3 y 6 dígitos"
                            }
                        }
                },
                perfil:
                {
                    validators:
                    {
                        notEmpty:
                        {
                            message: 'Campo vacio'
                        },
                    }
                },
                email:
                {
                    validators:
                    {
                        notEmpty:
                        {
                            message: 'Campo vacio'
                        },
                        emailAddress:
                        {
                            message: 'No es un email válido'
                        }
                    }
                },
                clave:
                {
                    validators:
                    {
                        notEmpty:
                        {
                            message: 'Campo vacio'
                        },
                        stringLength:
                        {
                            min: 4,
                            max: 8,
                            message: "La contraseña debe contener 4 a 8 caracteres"
                        },
                        identical: 
                        {
                            field: 'Rclave',
                            message: 'Las contraseñas no coinciden'
                        }
                    }
                },
                Rclave:
                {
                    validators:
                    {
                        notEmpty:
                        {
                            message: 'Campo vacio'
                        },
                        identical: 
                        {
                            field: 'clave',
                            message: 'Las contraseñas no coinciden'
                        }
                    }
                }
            }
        }

    ).on("success.form.bv", function (form) {

        form.preventDefault();

        var formData = new FormData($(this)[0]);
        var archivo = document.getElementById("foto");
        formData.append("foto", archivo.files[0]);
        formData.append("caso", "registro");

        $.ajax({
            url: "./admin.php/",
            type: "POST",
            data: formData,
            dataType: 'text',
            contentType: false,
            cache: false,
            processData: false
        }).done(function (res) {

            alert(res);
            location.href = "login.html";

        }).fail(function (res) {

            alert("error " + res);
        });


    });
});

