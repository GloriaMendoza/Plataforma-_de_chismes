
const chat = document.getElementById("chat");
const formulario = document.getElementById("formChisme");
const nombre = document.getElementById("nombre");
const mensaje = document.getElementById("mensaje");
const tituloTema = document.getElementById("tituloTema");

const respondiendoA = document.getElementById("respondiendoA");
const textoRespuesta = document.getElementById("textoRespuesta");
const mensajeRespuesta = document.getElementById("mensajeRespuesta");
const cancelarRespuesta = document.getElementById("cancelarRespuesta");

// Guardamos los chismes de cada tema por separado
const temas = {};

let temaActual = "";
let chismeResponder = null;

// Creamos una lista de chismes para cada tema del HTML

const listaTemas = document.getElementById("listaTemas");
const botonNuevoTema = document.getElementById("nuevoTema");
const formularioNuevoTema = document.getElementById("formNuevoTema");
const nombreTema = document.getElementById("nombreTema");
const guardarTema = document.getElementById("guardarTema");
const cancelarTema = document.getElementById("cancelarTema");

// Aquí guardaremos los nombres de los temas
const nombresTemas = [];

// Agregar un tema a la lista

function agregarTema(titulo) {
    const elemento = document.createElement("div");
    elemento.className = "tema";

    const informacion = document.createElement("div");
    informacion.className = "info-tema";

    const nombre = document.createElement("h5");
    nombre.textContent = titulo;

    const vistaPrevia = document.createElement("p");
    vistaPrevia.textContent = "Todavía no hay chismes";

    // Crear el botón X
    const botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.className = "boton-eliminar-tema";
    botonEliminar.textContent = "×";
    botonEliminar.title = "Eliminar tema";

    // Organizar los elementos
    informacion.append(nombre, vistaPrevia);
    elemento.append(informacion, botonEliminar);
    listaTemas.appendChild(elemento);

    // Guardar el nombre del tema
    nombresTemas.push(titulo);

    // Crear su espacio para guardar los chismes
    temas[titulo] = {
        chismes: []
    };

    // Abrir el tema al hacer clic en su tarjeta
    elemento.addEventListener("click", function() {
        abrirTema(elemento, titulo);
    });

    // Eliminar el tema al pulsar la X
    botonEliminar.addEventListener("click", function(event) {
        event.stopPropagation();
        eliminarTema(titulo, elemento);
    });

    return elemento;
}



function eliminarTema(titulo, elemento) {
    const confirmar = confirm(
        `¿Seguro que deseas eliminar el tema "${titulo}" y sus chismes?`
    );

    if (!confirmar) return;

    // Eliminar el tema de la lista y de los datos
    elemento.remove();
    delete temas[titulo];

    const indice = nombresTemas.indexOf(titulo);
    if (indice !== -1) {
        nombresTemas.splice(indice, 1);
    }

    // Si eliminamos el tema seleccionado, limpiar la conversación
    if (temaActual === titulo) {
        temaActual = "";
        tituloTema.textContent = "Selecciona un tema";
        chat.innerHTML = `
            <div class="mensaje-vacio">
                <div class="iconos-vacios">💬</div>
                <h4>Selecciona o crea un tema</h4>
                <p>¡Aquí aparecerán los chismes!</p>
            </div>
        `;

        cancelarRespuestaActual();
    }
}

// Mostrar u ocultar el formulario
botonNuevoTema.addEventListener("click", function() {
    formularioNuevoTema.hidden = false;
    nombreTema.focus();
});

cancelarTema.addEventListener("click", function() {
    formularioNuevoTema.hidden = true;
    nombreTema.value = "";
});

// Crear el tema
guardarTema.addEventListener("click", function() {
    const titulo = nombreTema.value.trim();

    if (titulo === "") {
        nombreTema.focus();
        return;
    }

    // Evitar nombres duplicados
    const existe = nombresTemas.some(function(nombre) {
        return nombre.toLowerCase() === titulo.toLowerCase();
    });

    if (existe) {
        alert("Ya existe un tema con ese nombre.");
        return;
    }

    const elemento = agregarTema(titulo);

    // Limpiar y cerrar el formulario
    nombreTema.value = "";
    formularioNuevoTema.hidden = true;

    // Abrir el tema recién creado
    abrirTema(elemento, titulo);
});

// Crear algunos temas iniciales
[ 
    "Deportes", "Vida universitaria", "Entretenimiento", "Tecnología"
].forEach(function(titulo) {
    agregarTema(titulo);
});

// Abrir el primer tema al iniciar
if (listaTemas.firstElementChild) {
    const primerTema = listaTemas.firstElementChild;
    abrirTema(
        primerTema,
        primerTema.querySelector("h5").textContent
    );
}


// Abrir una conversación
function abrirTema(elemento, titulo) {
    temaActual = titulo;

    // Quitar selección del tema anterior
    document.querySelectorAll(".tema").forEach(function(tema) {
    tema.classList.remove("activo");
});

    // Marcar el tema seleccionado
    elemento.classList.add("activo");

    // Cambiar el título de la conversación
    tituloTema.textContent = titulo;

    // Cancelar una respuesta si cambiamos de tema
    cancelarRespuestaActual();

    // Mostrar los chismes del tema seleccionado
    mostrarChismes();
}

// Mostrar los chismes del tema actual
function mostrarChismes() {
    chat.innerHTML = "";

    const listaChismes = temas[temaActual].chismes;

    if (listaChismes.length === 0) {
        const mensajeInicial = document.createElement("div");
        mensajeInicial.className = "mensaje-vacio";

        const icono = document.createElement("div");
        icono.className = "iconos-vacios";
        icono.textContent = "💬";

        const titulo = document.createElement("h4");
        titulo.textContent = "Sé el primer chismoso";

        const texto = document.createElement("p");
        texto.textContent = "¡Cuéntanos qué sabes!";

        mensajeInicial.append(icono, titulo, texto);
        chat.appendChild(mensajeInicial);
        return;
    }

    // Mostrar cada publicación
    listaChismes.forEach(function(chisme) {
        mostrarUno(chisme, chat);
    });
}

// Mostrar una publicación y sus respuestas
function mostrarUno(chisme, lugar) {
    const publicacion = document.createElement("div");
    publicacion.className = "publicacion";

    const autor = document.createElement("strong");
    autor.textContent = chisme.nombre;

    const texto = document.createElement("p");
    texto.className = "mensaje-texto";
    texto.textContent = chisme.mensaje;

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "btn-responder";
    boton.textContent = "Responder";

    // Al pulsar responder, usamos el cuadro de abajo
    boton.addEventListener("click", function() {
        seleccionarRespuesta(chisme);
    });

    publicacion.append(autor, texto, boton);
    lugar.appendChild(publicacion);

    // Mostrar respuestas debajo de esta publicación
    if (chisme.respuestas.length > 0) {
        const listaRespuestas = document.createElement("div");
        listaRespuestas.className = "lista-respuestas";

        chisme.respuestas.forEach(function(respuesta) {
            mostrarUno(respuesta, listaRespuestas);
        });

        lugar.appendChild(listaRespuestas);
    }
}

// Preparar una respuesta en el cuadro inferior
function seleccionarRespuesta(chisme) {
    chismeResponder = chisme;

    textoRespuesta.textContent = "Respondiendo a " + chisme.nombre;
    mensajeRespuesta.textContent = chisme.mensaje;

    respondiendoA.hidden = false;

    // Llevar el cursor al campo del mensaje
    mensaje.focus();
}

// Cancelar la respuesta
function cancelarRespuestaActual() {
    chismeResponder = null;
    respondiendoA.hidden = true;
    textoRespuesta.textContent = "";
    mensajeRespuesta.textContent = "";
}

// Botón X
cancelarRespuesta.addEventListener("click", function() {
    cancelarRespuestaActual();
    mensaje.focus();
});

// Publicar un chisme o una respuesta
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombreEscrito = nombre.value.trim();
    const mensajeEscrito = mensaje.value.trim();

    if (!nombreEscrito || !mensajeEscrito || !temaActual) {
        return;
    }

    const nuevoChisme = {
        nombre: nombreEscrito,
        mensaje: mensajeEscrito,
        respuestas: []
    };

    if (chismeResponder) {
        // Agregar la respuesta a la publicación seleccionada
        chismeResponder.respuestas.push(nuevoChisme);
    } else {
        // Agregar un nuevo chisme al tema actual
        temas[temaActual].chismes.push(nuevoChisme);
    }

    // Limpiar solo el mensaje; conservar el alias
    mensaje.value = "";

    // Salir del modo de respuesta
    cancelarRespuestaActual();

    // Actualizar la conversación
    mostrarChismes();
});


