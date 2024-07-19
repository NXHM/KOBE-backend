const express = require('express');
const router = express.Router();

//Importar consultas
const { getTipo  } = require('../controllers/Tipo');
const { getCategoria,updateCategoria,deleteCategoria, createCategoria, getCategoriaConTipos, getCategoriaById  } = require('../controllers/Categoria');
const { ingresarMovimiento, getMovimientos, getMontoPorCategoriaMovimiento, getMontoPorTipoMovimiento, getMovements, getCategoriesType, getAllMovimientos  } = require('../controllers/Movimiento');
const { createUser, loginUser, changePassword, validateVerificationCode, sendVerificationCode} = require('../controllers/userController');
const { getUser, putUser, putEmail, putPassword, logoutUser } = require('../controllers/userController');
const { editarMovimiento, eliminarMovimiento, getMovement } = require('../controllers/Movimiento');
const { getPresupuesto, getPresupuestoAgrupadoPorTipo,getPresupuestoPorCategoria, getPresupuestoPorTipo, createBudget, updateBudget} = require('../controllers/Presupuesto');
const { validarToken } = require('../config/Middleware');
const { getDiasXMes, getAllMonths } = require('../controllers/Mes');
const { getMovimientosYPresupuestosPorCategoria } = require('../controllers/MovimientoPresupuesto');

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
router.get('/tipo', getTipo);
router.post('/categoria', validarToken, getCategoria);
router.post('/createCategoria', validarToken, createCategoria)
router.put('/updatecategoria/:id', validarToken,updateCategoria);
router.delete('/deletecategoria/:id', validarToken, deleteCategoria);
router.get('/categoriasTipo', validarToken, getCategoriaConTipos);
router.get('/getCategoriaporId/:category_id', validarToken, getCategoriaById);

//Movimientos
router.post('/ingresarMovimiento', validarToken, ingresarMovimiento);
router.post('/movimientos', validarToken, getMovimientos);
router.post('/movimientos2', validarToken, getMovements);
router.post('/movimientos/sumaCategorias', validarToken, getMontoPorCategoriaMovimiento);
router.post('/movimientos/sumaTipo',validarToken, getMontoPorTipoMovimiento);

//Historial
router.put('/editmovimiento/:id', validarToken, editarMovimiento);
router.delete('/deletemovimiento/:id', validarToken, eliminarMovimiento);
router.post('/categoriesType', validarToken, getCategoriesType);
router.get('/getMovements', validarToken, getAllMovimientos);
router.get('/getMovement/:id',validarToken, getMovement);

/* Presupuestos */
router.get('/getBudget', validarToken,getPresupuesto);
router.post('/presupuestos/sumaCategoria', validarToken,getPresupuestoPorCategoria);
router.post('/presupuestos/sumaTipo',validarToken, getPresupuestoPorTipo);
router.post('/createBudget', validarToken, createBudget);
router.put('/updateBudget', validarToken, updateBudget);
router.get('/presupuestos/tipo', validarToken,getPresupuestoAgrupadoPorTipo);

/* Presupuestos y Movimientos por categoria */
router.post('/budgetMovement', validarToken, getMovimientosYPresupuestosPorCategoria)

/* Meses */
router.get('/dias/:month/:year', validarToken,getDiasXMes);
router.get('/meses', validarToken, getAllMonths);

module.exports = router;
