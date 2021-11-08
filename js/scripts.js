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