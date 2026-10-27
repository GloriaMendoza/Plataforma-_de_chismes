
const chat = document.getElementById("chat");
const formulario = document.getElementById("formChisme");

const nombre = document.getElementById("nombre");
const mensaje = document.getElementById("mensaje");

// Aqui guardamos los chismes
let chismes = [];

// Publicar un chisme
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtenemos lo que escribio el usuario
    let nuevoChisme = {
        nombre: nombre.value,
        mensaje: mensaje.value,
        respuestas: []
    };

    // Agregamos el chisme a la lista
    chismes.push(nuevoChisme);

    // Limpiamos los campos
    formulario.reset();

    // Mostramos los chismes
    mostrarChismes();
});

// Mostrar todos los chismes
function mostrarChismes() {
    chat.innerHTML = "";

    // Recorremos la lista de chismes
    for (let i = 0; i < chismes.length; i++) {
        mostrarUno(chismes[i], chat);
    }
}

// Mostrar un chisme o una respuesta
function mostrarUno(chisme, lugar) {
    let publicacion = document.createElement("div");
    publicacion.className = "publicacion";

    let autor = document.createElement("strong");
    autor.textContent = chisme.nombre;

    let texto = document.createElement("p");
    texto.className = "mensaje-texto";
    texto.textContent = chisme.mensaje;

    let boton = document.createElement("button");
    boton.textContent = "Responder";
    boton.className = "btn-responder";
    boton.type = "button";

    publicacion.appendChild(autor);
    publicacion.appendChild(texto);
    publicacion.appendChild(boton);

    lugar.appendChild(publicacion);

    // Crear una respuesta
    
    // Crear el formulario para responder
    boton.addEventListener("click", function() {

        // Evitar que aparezcan varios formularios
        if (publicacion.querySelector("form")) {
            return;
        }

        let formularioRespuesta = document.createElement("form");
        formularioRespuesta.className = "form-respuesta";

        let nombreRespuesta = document.createElement("input");
        nombreRespuesta.className = "form-control mb-2";
        nombreRespuesta.placeholder = "Tu nombre";
        nombreRespuesta.required = true;

        let mensajeRespuesta = document.createElement("textarea");
        mensajeRespuesta.className = "form-control mb-2";
        mensajeRespuesta.placeholder = "Escribe tu respuesta";
        mensajeRespuesta.required = true;

        let enviar = document.createElement("button");
        enviar.type = "submit";
        enviar.className = "btn btn-sm btn-primary";
        enviar.textContent = "Responder";

        formularioRespuesta.append(
            nombreRespuesta,
            mensajeRespuesta,
            enviar
        );

        publicacion.appendChild(formularioRespuesta);

        formularioRespuesta.addEventListener("submit", function(event) {
            event.preventDefault();

            let respuesta = {
                nombre: nombreRespuesta.value.trim(),
                mensaje: mensajeRespuesta.value.trim(),
                respuestas: []
            };

            if (respuesta.nombre && respuesta.mensaje) {
                chisme.respuestas.push(respuesta);
                mostrarChismes();
            }
        });
    });


    // Mostrar las respuestas debajo del chisme
    for (let i = 0; i < chisme.respuestas.length; i++) {
        let espacio = document.createElement("div");
        espacio.className = "respuesta";

        lugar.appendChild(espacio);

        mostrarUno(chisme.respuestas[i], espacio);
    }
}