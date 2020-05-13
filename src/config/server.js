const PUERTO = 5000;
const express = require("express");
const bodyParser = require("body-parser");
const jsonAutores = require("../shared/autores.json");
const app = express();

// Middleware para la gestión del body
app.use(bodyParser.json());

app.get("/api/v1/autores/healt", (req, res) => {
  return res.status(200).json({ estado: "ok" });
});

// Mostrar todos los autores
app.get("/api/v1/autores", (req, res) => {
  return res.status(200).json(jsonAutores.autores);
});

// Agregar un nuevo autor
app.post("/api/v1/autores", (req, res) => {
  const { autor } = req.body;
  jsonAutores.autores.push(autor);
  return res.status(200).json(jsonAutores.autores);
});

// Buscar autor por id
app.get("/api/v1/autores/:id", (req, res) => {
  const idAutor = req.params.id;
  const autor = jsonAutores.autores.filter(
    (autor) => autor.id === parseInt(idAutor)
  );
  if (autor.length > 0) {
    return res.status(200).json(autor);
  }
  return res.status(404).json({ mensaje: "Autor no encontrado" });
});

// Eliminar autor por id
app.delete("/api/v1/autores/:id", (req, res) => {
  const idAutor = req.params.id;
  const indexAutor = jsonAutores.autores.findIndex(
    (autor) => autor.id === parseInt(idAutor)
  );
  if (indexAutor > -1) {
    jsonAutores.autores.splice(indexAutor, 1);
    return res.status(204).json();
  }
  return res.status(404).json({ mensaje: "Autor no encontrado" });
});

// Actualizar autor
app.put("/api/v1/autores", (req, res) => {
  const { autor } = req.body;
  const indexAutor = jsonAutores.autores.findIndex(
    (autor) => autor.id === parseInt(autor.id)
  );
  if (indexAutor > -1) {
    jsonAutores.autores[indexAutor] = autor;
    return res.status(200).json(jsonAutores.autores[indexAutor]);
  }
  return res.status(404).json({ mensaje: "Autor no encontrado" });
});

// Levantamos o ponemos a escuchar nuestro servidor
app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en el puerto ${PUERTO}`);
});
