import http from "http";
import path from "path";

// Definimos la variable __dirname
global["__dirname"] = path.dirname(new URL(import.meta.url).pathname);

const server = http.createServer(async (req, res) => {
  // Desestructurando "req"
  let { url, method } = req;

  console.log(`📣 CLIENT-REQUEST: ${req.url} ${req.method}`);

  // Enrutando peticiones
  switch (url) {
    case '/':
      // Petición a la raíz
      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
      res.write(`
      <html>
        <head>
          <title>My App</title>
        </head>
        <body> 
          <h1 style="color: #333">Hello from my server</h1>
          <p style="color: #34495E">Estás en el recurso raíz.</p>
        </body>
      </html>
      `);
      res.statusCode = 200;
      res.end();
      console.log(`📣 Respondiendo: 200 ${url} ${method}`);
      break;

    case '/author':
      // Petición a la ruta "/author"
      res.setHeader('Content-Type', 'text/html');
      let url_image = 'https://media.istockphoto.com/id/180841365/photo/hes-a-handsome-man.jpg?s=612x612&w=0&k=20&c=vjQLLI8g_a0O6_xx0plUu3CJ9AMhnSzHssLwgem8gE4=';
      res.write(`
      <html>
        <head>
          <title>My App</title>
        </head>
        <body style="text-align: center;">
          <h1 style="color: #333;">&#9889; Author &#9889;</h1>
          <p style="color: #34495E;">Iván Rivalcoba Rivas - Web Developer</p>
          <div>
            <img width="300px" src="${url_image}" alt="Foto Ivan Rivalcoba">
          </div>
        </body>
      </html>
      `);
      res.statusCode = 200;
      res.end();
      console.log(`📣 Respondiendo: 200 ${url} ${method}`);
      break;

    case "/message":
      // Verificando si es post
      if (method === "POST") {
        // Procesa el formulario
        res.statusCode = 200;
        res.write("🎉 Endpoint Funcionando!!! 🎉");
      } else {
        res.statusCode = 404;
        res.write("404: Endpoint no encontrado");
      }
      res.end();
      break;

    default:
      // Petición a recurso no encontrado
      res.setHeader('Content-Type', 'text/html');
      res.write(`
      <html>
        <head>
          <title>My App</title>
        </head>
        <body> 
          <h1>&#128534; 404 Recurso no encontrado</h1>
          <p>Lo sentimos, pero no tenemos lo que buscas...</p>
        </body>
      </html>
      `);
      res.statusCode = 404;
      res.end();
      console.log(`📣 Respondiendo: 404 ${url} ${method}`);
      break;
  }
});

// Configuración para escuchar en el puerto 3000
server.listen(3000, "0.0.0.0", () => {
  console.log("👩‍🍳 Servidor escuchando en http://localhost:3000");
});
