Plataforma de Chismes

Plataforma para enviar mensajes en una conversación general en tiempo real, desarrollada con HTML, CSS, JavaScript, Node.js, Express y MongoDB.

Tecnologías Utilizadas

Frontend: HTML5, CSS3, JavaScript, Bootstrap

Backend: Node.js, Express

Base de Datos: MongoDB

Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu sistema:

Node.js

Git

Instrucciones para Clonar e Instalar

Para obtener una copia local del repositorio e instalar las dependencias necesarias:

# 1. Clonar el repositorio
git clone https://github.com/carlos0212murillo/Plataforma_de_Chismes.git

# 2. Entrar al directorio del proyecto
cd Plataforma_de_Chismes

# 3. Instalar las dependencias de Node.js
npm install


Si vas a conectar el repositorio local existente a GitHub manualmente:

git init
git remote add origin https://github.com/carlos0212murillo/Plataforma_de_Chismes.git


Flujo de Trabajo en Git y Uso de Ramas

Para mantener el código organizado y sincronizado con el repositorio central, sigue el siguiente flujo de trabajo:

1. Actualizar la rama base (develop)

Antes de crear una nueva funcionalidad, asegúrate de tener la versión más reciente de la rama develop:

git checkout develop
git pull origin develop


2. Crear y cambiar a una nueva rama de trabajo

Crea una rama específica para la tarea que vas a realizar:

# Crear y cambiar a la rama en un solo paso
git checkout -b NOMBRE_DE_LA_RAMA

# O en dos pasos
git branch NOMBRE_DE_LA_RAMA
git checkout NOMBRE_DE_LA_RAMA


3. Guardar y subir cambios

Una vez realizados los cambios en tu código:

# Preparar todos los archivos modificados
git add .

# Confirmar los cambios con un mensaje descriptivo
git commit -m "Descripción de los cambios realizados"

# Subir la rama al repositorio remoto
git push origin NOMBRE_DE_LA_RAMA



Ejecución del Proyecto

Para iniciar el servidor Node.js:

# Iniciar con el script estándar de Node
npm start



La aplicación estará disponible en la dirección: http://localhost:3000

Estructura del Proyecto

Plataforma_de_Chismes/
├── node_modules/       # Dependencias de Node (ignorado por Git)
├── index.html          # Vista principal
├── script.js           # Lógica frontend
├── style.css           # Estilos CSS
├── server.js           # Servidor express y conexión a la base de datos
├── package.json        # Configuración de scripts y dependencias
├── .gitignore          # Exclusión de archivos para Git
└── README.md           # Documentación del proyecto