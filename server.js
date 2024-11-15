const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete cors

const app = express();
const port = 5000; // O el puerto que prefieras

// Habilitar CORS para que el servidor acepte solicitudes de tu frontend
app.use(cors({ origin: ['http://localhost:3000', 'http://18.117.85.238'] }));

app.use(express.json());

// Configurar body-parser para que Express pueda recibir datos JSON
app.use(bodyParser.json());

// Crear la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: '18.117.85.238', // IP del servidor
  user: 'jfet',         // Usuario de la base de datos
  password: 'admin10$',  // Contraseña de la base de datos
  database: 'ventas'     // Nombre de la base de datos
});

// Verificar la conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Ruta para el registro del carrito
app.post('/registroC', (req, res) => {
  const { name, email, total } = req.body;

  if (name && email && total) {
    const query = 'INSERT INTO carrito (name, email, total) VALUES (?, ?, ?)';
    
    db.query(query, [name, email, total], (err, result) => {
      if (err) {
        console.error('Error al insertar en carrito:', err);
        res.status(500).send('Error al registrar los datos');
      } else {
        res.send('Tu registro se ha completado');
      }
    });
  } else {
    res.status(400).send('Faltan campos en la solicitud');
  }
});

// Ruta para el registro de usuarios
app.post('/registro', (req, res) => {
  const { email, nombre, apellidos, telefono, password } = req.body;

  if (email && nombre && apellidos && telefono && password) {
    const query = 'INSERT INTO login (email, nombre, apellidos, telefono, password) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [email, nombre, apellidos, telefono, password], (err, result) => {
      if (err) {
        console.error('Error al insertar en login:', err);
        res.status(500).send('Error al registrar los datos');
      } else {
        res.send('Tu registro se ha completado');
      }
    });
  } else {
    res.status(400).send('Faltan campos en la solicitud');
  }
});

// Iniciar el servidor en el puerto especificado
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });