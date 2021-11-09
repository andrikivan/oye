function validarRegistro(formulario) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(formulario.email.value)) {
        document.getElementById("errorEmail").innerText = "Email no válido";
        formulario.email.focus();
        return false;
    }
    else {
        document.getElementById("errorEmail").innerText = "";
    }
  
    if (formulario.contrasena.value.trim().length < 6) {
        document.getElementById("errorContraseña").innerText = "Pruebe otra contraseña";
        formulario.contrasena.focus();
        return false;
    }
    else {
        document.getElementById("errorContraseña").innerText = "";
    }
  
    if (formulario.contrasena.value != formulario.repetirContrasena.value) {
        document.getElementById("errorContraseñaDistinta").innerText = "Las contraseñas no coinciden";
        formulario.repetirContrasena.focus();
        return false;
    }
    else {
        document.getElementById("errorContraseñaDistinta").innerText = "";
    }

    if (formulario.genero.value ==  "") {
        document.getElementById("errorGenero").innerText = "Elija un género musical";
        
        return false;
    }
    else {
        document.getElementById("errorGenero").innerText = "";
    }
    
    if (formulario.edad.value ==  "") {
        document.getElementById("errorEdad").innerText = "Elija un rango de edad";
        
        return false;
    }
    else {
        document.getElementById("errorGenero").innerText = "";
    }

    if (!formulario.terminos.checked) {
        document.getElementById("errorTerminos").innerText = "Términos y Condiciones obligatorio";
        formulario.terminos.focus();
        return false;
    }
    else {
        document.getElementById("errorTerminos").innerText = "";
    }

    alert("¡Se ha registrado exitósamente!");
    return true;
}

function validarLogin(formulario) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(formulario.email.value)) {
        document.getElementById("errorEmail").innerText = "Email Incorrecto";
        formulario.email.focus();
        return false;
    }
    else {
        document.getElementById("errorEmail").innerText = "";
    }
  
    if (formulario.contrasena.value.trim().length < 6) {
        document.getElementById("errorContraseña").innerText = "Contraseña Incorrecta";
        formulario.contrasena.focus();
        return false;
    }
    else {
        document.getElementById("errorContraseña").innerText = "";
    }

    alert("¡Inicio de Sesión Exitoso!");
    return true;
}



//Funciones canciones

function mostrarTop3() {
    // se requiere iniciar un servidor para que esto funcione
    // en visual studio code utilizo la extensión Live Server
    var peticion = new XMLHttpRequest(); 
    peticion.open('GET','http://127.0.0.1:5500/datos.json');
    var top3Canciones=[0,0,0];
    peticion.onload = function() {
        if (peticion.status == 200) {
            var datos = JSON.parse(peticion.response);
            for (i = 0; i < datos.canciones.length; i++) {
                if (datos.canciones[i].reproducciones > datos.canciones[top3Canciones[0]].reproducciones){
                    top3Canciones[2]=top3Canciones[1];
                    top3Canciones[1]=top3Canciones[0];
                    top3Canciones[0]=i;
                    console.log("Puesto1",datos.canciones[i].reproducciones,datos.canciones[top3Canciones[0]].reproducciones);
                } else if (datos.canciones[i].reproducciones > datos.canciones[top3Canciones[1]].reproducciones){
                    top3Canciones[2]=top3Canciones[1];
                    top3Canciones[1]=i;
                    console.log("Puesto2",datos.canciones[i].reproducciones,datos.canciones[top3Canciones[1]].reproducciones);
                }
                else if (datos.canciones[i].reproducciones > datos.canciones[top3Canciones[2]].reproducciones){
                    top3Canciones[2]=i;
                    console.log("Puesto3",datos.canciones[i].reproducciones,datos.canciones[top3Canciones[2]].reproducciones);
                }
            
            }
            
            for (k = 0; k < 3; k++) {
                document.getElementById("nombre"+k).innerText = datos.canciones[top3Canciones[k]].nombre;
                document.getElementById("audio"+k).src= "canciones/"+datos.canciones[top3Canciones[k]].ruta;
            }
        }
        
        
    };
    peticion.send();
    
    
    
    
}