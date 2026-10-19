const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

// Servir paginas estáticos
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});