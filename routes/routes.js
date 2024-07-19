const express    = require('express');
const router     = express.Router();

//Importar consultas
const { getTipo  } = require('../controllers/Tipo');
const { getCategoria,updateCategoria,deleteCategoria, createCategoria  } = require('../controllers/Categoria');
const { ingresarMovimiento, getMovimientos, getMontoPorCategoriaMovimiento, getMontoPorTipoMovimiento  } = require('../controllers/Movimiento');
const { createUser, loginUser, changePassword, validateVerificationCode, sendVerificationCode} = require('../controllers/userController');
const { getUser, putUser, putEmail, putPassword, logoutUser } = require('../controllers/userController');
const { editarMovimiento, eliminarMovimiento } = require('../controllers/Movimiento');
const { getPresupuesto, getPresupuestoAgrupadoPorTipo,getPresupuestoPorCategoria, getPresupuestoPorTipo, createBudget, updateBudget} = require('../controllers/Presupuesto');
const { validarToken } = require('../config/Middleware');
const { getDiasXMes, getAllMonths } = require('../controllers/Mes');

//-----------Definir rutas-----------
// User
router.post('/createUser', createUser);
router.post('/loginUser', loginUser);
router.post('/requestVerification', sendVerificationCode);
router.post('/validateCode', validateVerificationCode);
router.post('/changePassword', changePassword);
router.get('/getUser', validarToken, getUser);
router.put('/putUser', validarToken, putUser);
router.put('/putEmail', validarToken, putEmail);
router.put('/putPassword', validarToken, putPassword);
router.get('/logoutUser', validarToken, logoutUser);

//Tipo
router.get('/tipo', validarToken, getTipo);
router.get('/categoria', validarToken, getCategoria);
router.post('/createCategoria', validarToken, createCategoria)
router.put('/updatecategoria/:id', validarToken,updateCategoria);
router.delete('/deletecategoria/:id', validarToken, deleteCategoria);
//Movimientos
router.post('/ingresarMovimiento', validarToken, ingresarMovimiento);
router.post('/movimientos', validarToken, getMovimientos);
router.post('/movimientos/sumaCategorias', validarToken, getMontoPorCategoriaMovimiento);
router.post('/movimientos/sumaTipo',validarToken, getMontoPorTipoMovimiento);

//Historial
router.put('/editmovimiento/:id', validarToken, editarMovimiento);
router.delete('/deletemovimiento/:id', eliminarMovimiento);

/* Presupuestos */
router.get('/presupuestos', validarToken,getPresupuesto);
router.post('/presupuestos/sumaCategoria', validarToken,getPresupuestoPorCategoria);
router.post('/presupuestos/sumaTipo',validarToken, getPresupuestoPorTipo);
router.post('/createBudget', createBudget);
router.put('/updateBudget', updateBudget);
router.get('/presupuestos/tipo', validarToken,getPresupuestoAgrupadoPorTipo);

/* Meses */
router.get('/dias/:month/:year', validarToken,getDiasXMes);
router.get('/meses', validarToken, getAllMonths);

module.exports = router;