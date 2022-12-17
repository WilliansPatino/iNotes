const fs = require("fs");
const { abrirDatabase } = require("./file");

const dbConnection = () => {

  
  try {

    // Conectar base de datos
    abrirDatabase();

    console.log('Base de datos en línea...');
    
    
    
  } catch (error) {
    
    console.log(error);
    throw new Error('Error durante la apertura de la base de datos');
    
  }
  
} // dbConnection


module.exports = {
  dbConnection
}