const express    = require('express');
const router     = express.Router();

//Importar consultas
const { getTipo  } = require('../controllers/Tipo');
const { getCategoria  } = require('../controllers/Categoria');
const { ingresarMovimiento, getMovimiento  } = require('../controllers/Movimiento');
//-----------Definir rutas-----------

//Tipo
router.get('/tipo', getTipo);
router.get('/categoria', getCategoria);
router.post('/ingresarMovimiento', ingresarMovimiento);
router.get('/movimiento', getMovimiento)


module.exports = router;
