const express    = require('express');
const router     = express.Router();

//Importar consultas
const { getTipo  } = require('../controllers/Tipo');
const { getCategoria  } = require('../controllers/Categoria');
const { ingresarMovimiento  } = require('../controllers/Movimiento');

const { createUser, loginUser } = require('../controllers/userController');

const { getMovimiento } = require('../controllers/Movimiento');
const { getPresupuesto, getPresupuestoPorCategoria, getPresupuestoPorTipo } = require('../controllers/Presupuesto');
//-----------Definir rutas-----------

//Tipo
router.get('/tipo', getTipo);
router.get('/categoria', getCategoria);
router.post('/ingresarMovimiento', ingresarMovimiento);
<<<<<<< HEAD
router.post('/createUser', createUser);
router.post('/loginUser', loginUser);
=======
router.get('/movimiento/:usuario_id', getMovimiento);
>>>>>>> 2b53c4462df3e39dd72fe7313e1373e8bc9aeca7

/* Presupuestos */
router.post('/presupuestos', getPresupuesto);
router.post('/presupuestos/sumaCategoria', getPresupuestoPorCategoria);
router.post('/presupuestos/sumaTipo', getPresupuestoPorTipo);

module.exports = router;
