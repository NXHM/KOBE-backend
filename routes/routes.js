const express    = require('express');
const router     = express.Router();

//Importar consultas
const { getTipo  } = require('../controllers/Tipo');
const { getCategoria  } = require('../controllers/Categoria');
const { ingresarMovimiento, getMovimientos, getMontoPorCategoriaMovimiento, getMontoPorTipoMovimiento  } = require('../controllers/Movimiento');
const { createUser, loginUser } = require('../controllers/userController');
const { changeEmail, changePasswd } = require('../controllers/userController');
const { editarMovimiento, eliminarMovimiento } = require('../controllers/Movimiento');
const { getPresupuesto, getPresupuestoPorCategoria, getPresupuestoPorTipo } = require('../controllers/Presupuesto');
const { getDiasXMes, getMeses } = require('../controllers/Mes');

//-----------Definir rutas-----------
// User
router.post('/createUser', createUser);
router.post('/loginUser', loginUser);
router.post('/changePasswd', changePasswd);
router.post('/changeEmail', changeEmail);

//Tipo
router.get('/tipo', getTipo);
router.get('/categoria', getCategoria);

//Movimientos
router.post('/ingresarMovimiento', ingresarMovimiento);
router.post('/movimientos', getMovimientos);
router.post('/movimientos/sumaCategorias', getMontoPorCategoriaMovimiento);
router.post('/movimientos/sumaTipo', getMontoPorTipoMovimiento);

//Historial
router.put('/editmovimiento/:id', editarMovimiento);
router.delete('/deletemovimiento/:id', eliminarMovimiento);

/* Presupuestos */
router.post('/presupuestos', getPresupuesto);
router.post('/presupuestos/sumaCategoria', getPresupuestoPorCategoria);
router.post('/presupuestos/sumaTipo', getPresupuestoPorTipo);

/* Meses */
router.get('/dias/:month/:year', getDiasXMes);
router.get('/meses', getMeses);

module.exports = router;