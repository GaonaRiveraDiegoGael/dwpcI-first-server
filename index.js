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
  console.log(`📣 url: ${req.url}`);
  console.log(`📣 method: ${req.method}`);
  // Estableciendo cabeceras
  res.setHeader('Content-Type', 'text/html');
  // Escribiendo la respuesta
  res.write('<html>');
  res.write('<head> <title>My App</title></head>');
  res.write('<body> <h1>Hello from my server</h1></body>');
  res.write('</html>');
  // Cerrando la comunicacion
  res.end();
});

// 5. Se pone a trabajar el servidor 
// Se le pasa un callback que se ejecutara cuando
// el servidor empiece a recibir peticiones 

server.listen(3000, "0.0.0.0", () => {
  console.log("👩‍🍳 Servidor escuchando en http://localhost:3000"); 
});  
