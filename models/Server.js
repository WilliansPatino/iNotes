const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../helpers/config-db');
require('dotenv').config();



class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
  

    // API
    this.usersRoutePath = '/api/notas';

    // Connect the database
    this.connectDB();

    // Middlewares
    this.middleware();

    this.routes();
  }

  async connectDB() {
      await dbConnection();
  }

  middleware() {

      // CORS
      this.app.use(cors());

      // Lectura y parseo del body // Cuqluier info que venga en POST o 
      // DELETE va a serializar a formato JSON.
      this.app.use( express.json() );

      // Directorio público
      this.app.use(express.static('public'));
  }


  routes() {

      this.app.use(this.usersRoutePath, require('../routes/notas'));

  }

  listen() {

      this.app.listen(this.port, () => {
          console.log(`Abra la sesión en la dirección:  http://localhost:${this.port}`);
      });
  }

}

module.exports = Server;