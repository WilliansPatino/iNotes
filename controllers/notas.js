const { response, request } = require('express');
const fs  = require('fs');

const { leerDatabase, salvarDatabase, agregarData, 
  cerrarDatabase, actualizaDabatabase } = require('../helpers/file');

const Nota = require('../models/Nota');





// const pid = leerDatabase();
// if (pid) { // carga notas 
//    const lista = notas.cargarNotasDelArreglo(pid);
//    console.log('Lista; ', lista)
//  }

const listarTodas = (req = request, res = response) => {
  console.clear();


   const records = leerDatabase();

  let notas = records.filter(e => {
    return e.activa === true;

  });



   
  //  if (listado) {
  //    notas.cargarNotasDelArreglo(listado)
  //   }

  console.log('ACTIVAS: ', notas)

    const total = notas.length;

  res.json({
    // msg: 'Listar todas las notas/tareas',
    notas,
    total,
    });

}

const buscarNota = (req, res) => {

  const { id } = req.params;

  const notas = leerDatabase();

  // tiene sentido usar filter() si se desea iterar/devolver todos los
  // elementos que que tengan/cumplan con  el id.
  // let nota = notas.filter( x => x._id === id );

  // para este caso, utilizo find() porque espero que solo de devuelva 
  // un elemento.
  let nota = notas.find( x => x._id === id );

    console.clear()
    console.log(`BUSCADA por ID: ${id} \n ${nota} `, {nota});


  res.json({
    id,
    nota
  })
}

const agregarNota = (req, res) => {

   

  // // extrae desde el 'body'
  const {titulo, descripcion, etiqueta, favorita, 
    concluida, activa } = req.body

   
  // deestructurar solo los campos que deseamos validar/almacenar
  const nota = new Nota( {titulo, descripcion, etiqueta, favorita,
      concluida,  activa} );

  console.log('>> TO APPEND: ', nota);

  // agregar la nota en la BD
  agregarData(nota)

  res.json(
    {nota}
  )


}

const actualizarNota = (req, res) => {

  const { id } = req.params;
  const notas = leerDatabase();

  let newArray = [... notas];

  let nota = notas.find( x => x._id === id );
  const iElement = notas.findIndex(element => element._id == id);

  console.clear()

  
  console.log(`BUSCADA por ID: ${id} \n ${nota} `, {nota});
  console.log('INDICE RECORD/ACTUALIZAR: ',iElement);

  
  // campos excluidos para evitar su modificacion
  const { _id, creadaEl, ... canChangeIt } = req.body;

  console.log('CAMPOS a MODIFICAR: ', canChangeIt)

  
  
  // Actualizacion de los campos
  newArray[iElement].titulo = canChangeIt.titulo != undefined
    ? canChangeIt.titulo : newArray[iElement].titulo;

  newArray[iElement].descripcion = canChangeIt.descripcion != undefined
    ? canChangeIt.descripcion : newArray[iElement].descripcion;

  newArray[iElement].etiqueta = canChangeIt.etiqueta != undefined 
    ? canChangeIt.etiqueta : newArray[iElement].etiqueta;

  newArray[iElement].favorita = canChangeIt.favorita != undefined 
    ? canChangeIt.favorita : newArray[iElement].favorita;

  newArray[iElement].actualizaEl = new Date().toLocaleString();

  newArray[iElement].imagen = canChangeIt.imagen != undefined 
    ? canChangeIt.imagen : newArray[iElement].imagen;
  
  newArray[iElement].concluida = canChangeIt.concluida != undefined 
    ? canChangeIt.concluida : newArray[iElement].concluida;

  newArray[iElement].activa = canChangeIt.activa != undefined 
    ? canChangeIt.activa : newArray[iElement].activa;


  // console.log('BACKUP ', newArray[iElement])

  console.log('RECORDS UPDATED ', nota);

  // BACKUP DATABASE WITH CHANGES
  // cerrarDatabase()
  actualizaDabatabase(newArray);

  // var d = new Date();
  // const datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
  //   d.getFullYear() + "-" + ("0" + d.getHours()).slice(-2) + "h" + ("0" + d.getMinutes()).slice(-2);

  // const newDatabase = "./db/data.json"+'_'+datestring;
  // const database = "./db/data.json";

  // // respaldo del archivo original
  // fs.rename(database, newDatabase, function (err) {
  //   if (err) throw err;
  //   console.log('Se ha creado el respaldo de las notas en: ', newDatabase);
  // });

  // // nuevo archivo
  // fs.writeFileSync(database, JSON.stringify(newArray))


  res.json({
    msg: 'Actualizar una nota',
    id,
    nota
  })
}

const eliminarNota = (req, res) => {

  const { id } = req.params;

  const notas = leerDatabase();

  // gestion de la data
  let newArray = [... notas];
  
  // búsqueda
  let nota = newArray.find( x => x._id === id );
  const iElement = newArray.findIndex(element => element._id == id);

  // elemento a actualizar
  let notaActualizada = newArray[iElement];

  console.clear()
  console.log('BUSCADA por el ID:'+' '+ id + ', ubicado en la posición: '+iElement);
  
  console.log({nota});
  
  // Se cambia el estado 'activo: false' del elemento encontrado
  notaActualizada.activa = false;
  
  console.log({notaActualizada});

  actualizaDabatabase(newArray);

  console.log("NUEVOS RECORDS", newArray)

  res.json({
    id,
    nota
    
  })
}

module.exports = {
  listarTodas,
  buscarNota,
  agregarNota,
  actualizarNota,
  eliminarNota,
}
