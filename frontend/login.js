$(document).ready(function () {

    $("#loginForm").bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove'
        },
        fields: {
            email:
            {
                validators:
                {
                    notEmpty:
                    {
                        message:'Campo vacio'
                    },
                    emailAddress: 
                    {
                        message: 'No es un email válido'
                    }
                }
            },
            password:
            {
                validators:
                {
                    notEmpty:
                    {
                        message:'Campo vacio'
                    },
                    stringLength:
                    {
                        min:4,
                        max:8,
                        message:"La contraseña debe contener 4 a 8 caracteres"
                    }
                }
            }
        }
    })
    //SI SUPERA TODAS LAS VALIDACIONES, SE PROVOCA EL SUBMIT DEL FORM
    .on('success.form.bv', function (form) {

        form.preventDefault();

        $.ajax({
            url:"./admin.php/email/clave",
            type:"POST",
            data:{
                "email":document.getElementById("email").value,
                "clave":document.getElementById("password").value,
                "caso":"login"
            },
            dataType:'text',
        }).done(function(res){
            console.log(res);
            //location.href="login.html";
            var datos=JSON.parse(res);
            
            if(datos.valido==="true")
            {
                location.href="principal.html";
            }
            else
            {
                $("#alertId").html("Error. Usuario Inexistente");
                $("#alertId").removeClass();
                $("#alertId").addClass("alert alert-warning");
            }

            }).fail(function (res){

                alert("error "+res);
            });

    });

});