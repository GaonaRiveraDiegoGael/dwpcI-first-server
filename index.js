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
      // Estableciendo cabeceras
      res.setHeader('Content-Type', 'text/html');
      // Escribiendo la respuesta
      res.write(`
      <html>
        <head>
          <title>My App</title>
          <style>
            body {
              background-color: #ECF0F1;
              font-family: Arial, sans-serif;
            }
            h1, h2 {
              color: #3498DB;
              text-align: center;
              margin-top: 50px;
            }
            form {
              margin-top: 30px;
              text-align: center;
            }
            input[type="text"] {
              width: 300px;
              padding: 10px;
              border: none;
              border-radius: 5px;
              box-shadow: 0px 0px 5px #3498DB;
              outline: none;
            }
            button[type="submit"] {
              background-color: #3498DB;
              color: #fff;
              border: none;
              border-radius: 5px;
              padding: 10px 20px;
              cursor: pointer;
              box-shadow: 0px 0px 5px #3498DB;
              outline: none;
            }
            button[type="submit"]:hover {
              background-color: #2980B9;
            }
          </style>
        </head>
        <body> 
          <h1>Hello from my server</h1>
          <h2>Ingresa un mensaje</h2>
          <div>
            <form action="/message" method="POST">
              <input type="text" name="message" required>
              <button type="submit">Send</button>
            </form>
          </div>
        </body>
      </html>
      `);
      console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
      // Estableciendo código de respuesta
      res.statusCode = 200;
      // Cerrando la comunicación
      res.end();
      break;

    case "/message":
      // Verificando si es POST
      if (method === "POST") {
        // Se crea una variable para almacenar los datos entrantes del cliente
        let body = "";
        
        // Se registra un manejador de eventos para la recepción de datos
        req.on("data", (data) => {
          body += data;
          // Limitar el tamaño del cuerpo a 1MB
          if (body.length > 1e6) return req.socket.destroy();
        });

        // Se registra un manejador de eventos para el término de recepción de datos
        req.on("end", () => {
          // Procesa el formulario
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/html");
          
          // Mediante URLSearchParams se extraen los campos del formulario
          const params = new URLSearchParams(body);
          // Se construye un objeto a partir de los datos en la variable params
          const parsedParams = Object.fromEntries(params);
          
          res.write(`
          <html>
            <head>
              <title>My App</title>
              <style>
                body {
                  background-color: #f9f9f9;
                  font-family: Arial, sans-serif;
                }
                h1 {
                  color: #e74c3c;
                  font-size: 48px;
                  margin-top: 50px;
                  text-align: center;
                }
                p {
                  font-size: 24px;
                  color: #7f8c8d;
                  text-align: center;
                  margin-top: 20px;
                }
                .error-message {
                  font-size: 18px;
                  color: #95a5a6;
                  text-align: center;
                  margin-top: 20px;
                }
              </style>
            </head>
            <body> 
              <h1 style="color: #333">SERVER MESSAGE RECEIVED &#128172;</h1>
              <p>${parsedParams.message}</p>
            </body>
          </html>
          `);
          // Se finaliza la conexión
          return res.end();
        });
      } else {
        res.statusCode = 404;
        res.write("404: Endpoint no encontrado");
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
      console.log(`📣 Respondiendo: 404 ${req.url} ${req.method}`);
      break;
  }
});

// Configuración para escuchar en el puerto 3000
server.listen(3000, "0.0.0.0", () => {
  console.log("👩‍🍳 Servidor escuchando en http://localhost:3000");
});
