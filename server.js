const Contenedor = require("./mainfinal");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

let contenedor = new Contenedor("productos.txt");


function randomFun (min,max)
{ 
  return Math.floor(Math.random()* (max - min + 1 )) + min;
  
}




app.get("/productos", async (request, response) => {
  await contenedor.init();
  response.json(contenedor.getAll());
});

app.get("/productosRandom", async (request, response) => {
  await contenedor.init();
  const products = contenedor.getAll();
  response.json(contenedor.getById(randomFun(1,products.length)));
});

const server = app.listen(PORT, () => {
  console.log(`Server Listenig [${PORT}]...`);
});

server.on("error", (e) => console.log(`Error On Server`, e));
