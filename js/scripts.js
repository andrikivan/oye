function validarRegistro(formulario) {
    //validación del formulario de registro, para cada campo del registro
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(formulario.email.value)) {
        document.getElementById("errorEmail").innerText = "Email no válido";
        formulario.email.focus();
        return false;
    }
    else {
        document.getElementById("errorEmail").innerText = "";
    }
  
    if (formulario.contrasena.value.trim().length < 8) {
        document.getElementById("errorContraseña").innerText = "Pruebe otra contraseña, mínimo 8 caracteres.";
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
    //validación del login, para cada campo del formulario
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(formulario.email.value)) {
        document.getElementById("errorEmail").innerText = "Email Incorrecto";
        formulario.email.focus();
        return false;
    }
    else {
        document.getElementById("errorEmail").innerText = "";
    }
  
    if (formulario.contrasena.value.trim().length < 8) {
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
    var top3Canciones=[0,0,0]; // lista para guardar el top 3
    peticion.onload = function() {
        if (peticion.status == 200) {
            var datos = JSON.parse(peticion.response);
            for (i = 0; i < datos.canciones.length; i++) { // si está correcto, recorre el json
                // luego pregunta si es mayor a alguno del top, compara con el 1er, 2do y 3er puesto
                if (datos.canciones[i].reproducciones > datos.canciones[top3Canciones[0]].reproducciones){
                    top3Canciones[2]=top3Canciones[1]; 
                    top3Canciones[1]=top3Canciones[0]; 
                    top3Canciones[0]=i;
                } else if (datos.canciones[i].reproducciones > datos.canciones[top3Canciones[1]].reproducciones){
                    top3Canciones[2]=top3Canciones[1]; // 
                    top3Canciones[1]=i;
                }
                else if (datos.canciones[i].reproducciones > datos.canciones[top3Canciones[2]].reproducciones){
                    top3Canciones[2]=i;
                }

            }
            for (k = 0; k < 3; k++) { // recorre el top y muestra las canciones con sus nombres
                document.getElementById("nombre"+k).innerText = datos.canciones[top3Canciones[k]].nombre;
                document.getElementById("audio"+k).src= "canciones/"+datos.canciones[top3Canciones[k]].ruta;
            }
        }
    };
    peticion.send();
}

function listarCanciones(){ // muestra las canciones que hay en el json
    const data = document.querySelector("#canciones");
    var peticion = new XMLHttpRequest(); 
    peticion.open('GET','http://127.0.0.1:5500/datos.json');
    var codigo="";
    peticion.onload = function() {
        if (peticion.status == 200) {
            var datos = JSON.parse(peticion.response); //si está correcto, comienza a recorrer el json
            for (i = 0; i < datos.canciones.length; i++) {
                codigo=codigo+'<div class="divCancion card"><div class="card-header"><img class="iconoCanciones" src="imagenes/icon_'+datos.canciones[i].icono+'.svg"></div><div class="p-0 card-body"><h5 class="fw-bold text-info">'+datos.canciones[i].nombre+'</h5><div><audio class="" id="audio2" src="canciones/'+datos.canciones[i].ruta+'" controls></audio></div></div></div>';
            }// coloca las canciones dentro del div con id canciones
            data.innerHTML = codigo; 
        }
    };
    peticion.send();
}

function filtrarCanciones(entrada,estructura) {
    var input, filter, contenedor, cancion, nombre, i, txtValue;
    input = document.getElementById(entrada); //la entrada escrita en el buscador
    filter = input.value.toUpperCase();
    contenedor = document.getElementById(estructura);
    cancion = contenedor.getElementsByClassName("divCancion");
    //recorre cada div
    for (i = 0; i < cancion.length; i++) {
        nombre = cancion[i].getElementsByTagName("h5")[0]; //selecciona el h5 de ese div
      if (nombre) {
        txtValue = (nombre.textContent || nombre.innerText);
        if (txtValue.toUpperCase().indexOf(filter) > -1) { //evalua si hay concidencias con la entrada
            cancion[i].style.display = ""; //oculta el div si no hay coincidencia
        } else {
            cancion[i].style.display = "none";
        }
      }
    }
  }