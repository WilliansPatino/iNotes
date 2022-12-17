

const Nota = require('./Nota');



class Notas {

  listado = {
    'any': null
  };

  constructor (listado) {

      this.listado = {};

  }

  get arregloDeNotas() {
      
      const listado = [];
      Object.keys( this.listado ).forEach( key => {
        // console.log(key);
        // console.log(this.listado[key]);

        const nota = this.listado[key];
        listado.push(nota);

      });

      return listado;

  }

  cargarNotasDelArreglo( notas = [] ) {

      notas.forEach( nota => {
        this.listado[nota.id] = nota;
      });

      return notas;
  }

  listarTodas() {
    this.arregloDeNotas.forEach( (nota, i) => {
    const indice = i + 1;
    const { titulo, descripcion, etiqueta,
            favorita, concluida, activa } = nota;
    
            return nota;
    });

  }

  crearNota(titulo, descripcion, etiqueta, favorita,
    concluida, activa) {

      this.titulo = titulo;
      this.descripcion = descripcion;
      this.etiqueta = etiqueta;
      this.favorita = favorita;
      this.concluida = concluida;
      this.activa = activa;

      const nota = new Nota(this.titulo,
        this.descripcion,
        this.etiqueta,
        this.favorita,
        this.concluida,
        this.activa);

        this.listado[nota.id] = nota;

        return this.listado;

    }


} // class Notas

module.exports = Notas;