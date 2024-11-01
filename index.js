import http from "http";
import path from "path";
import { promises as fs } from 'fs';

// Definimos la variable __dirname
global["__dirname"] = path.dirname(new URL(import.meta.url).pathname);

const server = http.createServer(async (req, res) => {
  // Desestructurando "req"
  let { url, method } = req;

  console.log(`📣 CLIENT-REQUEST: ${url} ${method}`);

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
          <h1 style="color: #333">Enviar Mensaje</h1>
          <form action="/message" method="POST">
              <label for="message">Mensaje:</label>
              <textarea id="message" name="message" required></textarea>
              <button type="submit">Enviar</button>
          </form>
        </body>
      </html>
      `);
      res.statusCode = 200;
      res.end();
      console.log(`📣 Respondiendo: 200 ${url} ${method}`);
      break;

    case "/message":
      // Verificando si es POST
      if (method === "POST") {
        // Se crea una variable para almacenar los datos entrantes del cliente
        let body = "";
        
        // Se registra un manejador de eventos para la recepción de datos
        req.on("data", (data) => {
          body += data;
          if (body.length > 1e6) return req.socket.destroy();
        });

        // Se registra un manejador de eventos para el término de recepción de datos
        req.on("end", async () => {
          // Procesa el formulario mediante URLSearchParams
          const params = new URLSearchParams(body);
          const parsedParams = Object.fromEntries(params);
          
          // Almacenamos en un archivo el mensaje
          await fs.writeFile('message.txt', parsedParams.message);
          console.log("📣 Archivo message.txt grabado");

          // Realizamos un redireccionamiento
          res.statusCode = 302;
          res.setHeader('Location', '/');
          // Se finaliza la conexión
          return res.end();
        });
      } else {
        res.statusCode = 404;
        res.write("📣 404: Endpoint no encontrado");
        res.end();
      }
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
