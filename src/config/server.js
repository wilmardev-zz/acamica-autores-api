const PUERTO = 5000;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const jsonAutores = require("../shared/autores.json");

// Middleware para la gestión del body
app.use(bodyParser.json());

app.get("/api/v1/autores", (req, res) => {
  return res.status(200).json(jsonAutores.autores);
});

// Levantamos o ponemos a escuchar nuestro servidor
app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en el puerto ${PUERTO}`);
});
