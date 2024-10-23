const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Define el directorio de subida

// Middleware para procesar datos enviados desde el formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos, como imágenes
app.use(express.static('public'));

// Ruta para mostrar el formulario de registro
app.get('/register', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/styles.css"> <!-- Asegúrate de que la ruta sea correcta -->
        <title>Registro</title>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                padding: 20px;
                max-width: 600px;
                margin: auto;
                border-radius: 10px;
                background-color: white;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            label {
                display: block;
                margin: 10px 0 5px;
            }
            input {
                width: 100%;
                padding: 10px;
                margin: 5px 0 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
            button {
                padding: 10px;
                background-color: #007BFF;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            button:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
        <h2>Formulario de Registro</h2>
        <form action="/register" method="POST" enctype="multipart/form-data">
            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name" required>

            <label for="surname">Apellido:</label>
            <input type="text" id="surname" name="surname" required>

            <label for="email">Correo Electronico:</label>
            <input type="email" id="email" name="email" required>

            <label for="password">Contrasena:</label>
            <input type="password" id="password" name="password" required>

            <label for="favoriteFood">Comida Favorita:</label>
            <input type="text" id="favoriteFood" name="favoriteFood"><br>

            <label for="favoriteArtist">Artista Favorito:</label>
            <input type="text" id="favoriteArtist" name="favoriteArtist"><br>

            <label for="favoritePlace">Lugar Favorito:</label>
            <input type="text" id="favoritePlace" name="favoritePlace"><br>

            <label for="favoriteColor">Color Favorito:</label>
            <input type="text" id="favoriteColor" name="favoriteColor"><br>

            <label for="image">Suba su foto de perfil:</label>
            <input type="file" id="image" name="image"><br>

            <!-- Agregar reCAPTCHA -->
            <div class="g-recaptcha" data-sitekey="6Ld7pWkqAAAAAPWHVTmpKzbvzva664WfLCXvlT5b"></div>

            <button type="submit">Registrarse</button>
        </form>
    </body>
    </html>
  `);
});

// Ruta para manejar el envío del formulario
app.post('/register', upload.single('image'), (req, res) => {
  const { name, surname, email, password, favoriteFood, favoriteArtist, favoritePlace, favoriteColor } = req.body;
  console.log({
    name, surname, email, password, favoriteFood, favoriteArtist, favoritePlace, favoriteColor
  });
  res.send('Registro completado con Exito.');
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
