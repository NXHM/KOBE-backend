const express    = require('express');
const router     = express.Router();

//Importar consultas
const { getTipo  } = require('../controllers/Tipo');
const { getCategoria  } = require('../controllers/Categoria');
const { ingresarMovimiento  } = require('../controllers/Movimiento');
const { getMovimiento } = require('../controllers/Movimiento');
const { getPresupuesto, getPresupuestoPorCategoria, getPresupuestoPorTipo } = require('../controllers/Presupuesto');
//-----------Definir rutas-----------

//Tipo
router.get('/tipo', getTipo);
router.get('/categoria', getCategoria);
router.post('/ingresarMovimiento', ingresarMovimiento);
router.get('/movimiento/:usuario_id', getMovimiento);

/* Presupuestos */
router.post('/presupuestos', getPresupuesto);
router.post('/presupuestos/sumaCategoria', getPresupuestoPorCategoria);
router.post('/presupuestos/sumaTipo', getPresupuestoPorTipo);

module.exports = router;
