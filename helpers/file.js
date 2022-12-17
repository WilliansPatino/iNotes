const { json } = require("express");
const fs = require("fs");

const database = "./db/data.json";

let fd;

const existDatabase = () => { 

  
    data = {};


if ( !fs.existsSync(database) ) {
  // crea nuevo archivo si no existe
    fs.writeFileSync(database, JSON.stringify([]))

      console.log('DB creada con éxito!')
      
      
    }
    
}

const abrirDatabase = () => {

  try {
   
    existDatabase();

    fd = fs.openSync(database);

    console.log("Base de datos en línea, file-descriptor: ", fd);
    return fd;

  } catch (error) {
    console.log(error);
    throw new Error("Error de apertura de la base de datos");
  }
}

const leerDatabase = () => {

  try {

      abrirDatabase();

      const file = fs.readFileSync(database, {encoding: 'utf-8'} );

      const data = JSON.parse(file.toString());

      return data;

    
  } catch (error) {
    console.log(error);
    throw new Error("Error de apertura de BD", error);
  }

}

const salvarDatabase = (data) => {

  try {

    fs.writeFileSync(database, JSON.stringify(data), (err) => {

      if (err) {
        console.log(err);
        throw err;
      } else {
        console.log('Data registrado con éxito!')
      }
    });

  } catch (error) {
    console.log(error);
    throw new Error('Error durante la grabación en la BD');
  }

}

const cerrarDatabase = () => {

  fs.close(fd, (err)  => { 
    if (err) {
      console.error('Fallas al cerrar la BD ', err);
    } else {
      console.log('Database asegurada!')
    }
  });
}


const agregarData = (data) => {

  this.newData = data;

  // read file
  let records = leerDatabase();

  console.log('>>NUEVO RECORD/POST: ', this.newData)

  console.log('RECORDS ACTUALES: ', records)

  records.push(this.newData);
  console.log('RECORDS ', records);

  let newRecords = JSON.stringify(records);
  fs.writeFile(database, newRecords, err => {
    // error checking
    if(err) throw err;
    
    console.log("New data added");
});  


  // fs.writeFileSync(database, JSON.stringify(file))

}

const actualizaDabatabase = (arr) => {

  cerrarDatabase()

  var d = new Date();
  const datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + "-" + ("0" + d.getHours()).slice(-2) + "h" + ("0" + d.getMinutes()).slice(-2);

  const newDatabase = "./db/data.json"+'_'+datestring;

    // respaldo del archivo original
    fs.rename(database, newDatabase, function (err) {
      if (err) throw err;
      console.log('Respaldo de database creado ... ', newDatabase);
    });

  // Nuevo base de datos
  fs.writeFileSync(database, JSON.stringify(arr));



}

module.exports = {
  abrirDatabase,
  leerDatabase,
  salvarDatabase,
  cerrarDatabase,
  agregarData,
  actualizaDabatabase
}
