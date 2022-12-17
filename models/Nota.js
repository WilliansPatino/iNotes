

// const { uuid } = require('uuid');
const { v4: uuidv4 } = require('uuid');

class Nota {

// + Si el obj no está definido o es nulo, cada propiedad del modelo se 
//   establece en su valor predeterminado respectivo.
// + Si el obj está definido pero una propiedad específica en ese obj no 
//   está definida o es nula, la propiedad del modelo respectivo se establece 
//   en el valor predeterminado.
// + Si el obj está definido y la propiedad en ese obj está definida, entonces 
//   la propiedad del modelo respectivo se establece en la propiedad del obj.

    constructor(obj) {

        obj = obj != null ? obj: {}
        this._id =  uuidv4();
        this.titulo = obj.titulo != null ? obj.titulo : 'Información no incluida durante la publicación'
        this.descripcion = obj.descripcion != null ? obj.descripcion : 'Información no incluida durante la publicación'
        this.etiqueta = obj.etiqueta != null ? obj.etiqueta : 'Información no incluida durante la publicación'
        this.favorita = obj.favorita != null ?  obj.favorita : false
        this.creadaEl = new Date().toLocaleString();
        this.actualizaEl = obj.actualizaEl != null ? obj.actualizaEl : 'No ha sido actualizada'
        this.imagen = obj.imagen != null ? obj.imagen : 'incluir enlace de la imagen'
        this.concluida = obj.concluida != null ? obj.concluida : false;
        this.activa = obj.activa != null ? obj.activa : true;
      
      }

} // class Nota

module.exports = Nota;

