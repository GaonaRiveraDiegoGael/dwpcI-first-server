// 1. Importar el módulo http 
import http from "http";

// 2. Importar el módulo path
import path from "path";

// 3. Definir las variables globales __dirname y __filename
global["__dirname"] = path.dirname(new URL(import.meta.url).pathname);
global["__filename"] = path.basename(new URL(import.meta.url).pathname);

// 4. Crear el servidor 
// cb (callback) es una *funcion* que se ejecutara 
// ante cualquier petición de un recurso a nuestro server 
// (request, response) 

const server = http.createServer((req, res) => {
    console.log("> Se ha recibido una petición."); 
    // Respondemos 
    res.write("Hola");
    // Se termina la conexión
      res.end();
    // Apagando el server
    process.exit();
  });

// 5. Se pone a trabajar el servidor 
// Se le pasa un callback que se ejecutara cuando
// el servidor empiece a recibir peticiones 

server.listen(3000, "0.0.0.0", () => {
  console.log("👩‍🍳 Servidor escuchando en http://localhost:3000"); 
});  
