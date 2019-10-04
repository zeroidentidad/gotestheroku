$(document).ready(function () {

    var host = window.location.hostname;
    var username;
    var finalConexion;

    $("#form-registro").on("submit", function (e) {
        e.preventDefault();
        username = $('#username').val();

        $.ajax({
            type: 'POST',
            url: 'https://'+host+'/validar',
            data: {
                "username": username
            },
            success: function(data) {
                result(data)
            }
        })
    })

    function result(data) {
        obj = JSON.parse(data)

        if(obj.valid===true){
            crearConexion()
        }else{
            console.log("Reintentando :v")
        }
    }

    function crearConexion() {
        $("#registro").hide()
        $("#container-chat").show()
        var conexion = new WebSocket("wss://"+host+"/chat/"+username)
        finalConexion = conexion
        conexion.onopen = function (response) {
            conexion.onmessage = function (response) {
                console.log(response.data)
                val = $("#chatArea").val()
                $("#chatArea").val(val+"\n"+response.data)
            }
        }
    }

    $("#form-mensaje").on("submit", function (e) {
        e.preventDefault()
        mensaje = $("#mensaje").val()
        finalConexion.send(mensaje)
        $("#mensaje").val("")
    })
})