const { Router } = require('express');
const { listarTodas,
        buscarNota,
        agregarNota,
        actualizarNota,
        eliminarNota } = require('../controllers/notas');

const router = Router();


// endpoints
router.get('/', listarTodas);
router.post('/', agregarNota );
router.get('/:id', buscarNota);
router.put('/:id', actualizarNota );
router.delete('/:id', eliminarNota );



module.exports = router