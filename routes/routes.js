const express    = require('express');
const router     = express.Router();

//Importar consultas
const { getTipo  } = require('../controllers/Tipo');
const { getCategoria,updateCategoria,deleteCategoria, createCategoria  } = require('../controllers/Categoria');
const { ingresarMovimiento, getMovimientos, getMontoPorCategoriaMovimiento, getMontoPorTipoMovimiento, getCategoriasbyTipo, getMovements  } = require('../controllers/Movimiento');
const { createUser, loginUser, loginUserWithCookies, logoutUser, getUserData } = require('../controllers/userController');
const { changePassword,validateVerificationCode, sendVerificationCode} = require('../controllers/userController');
const { changeEmail, changePasswd } = require('../controllers/userController');
const { editarMovimiento, eliminarMovimiento } = require('../controllers/Movimiento');
const { getPresupuesto, getPresupuestoAgrupadoPorTipo,getPresupuestoPorCategoria, getPresupuestoPorTipo, createBudget, updateBudget} = require('../controllers/Presupuesto');
const { validarToken } = require('../config/Middleware');
const { getDiasXMes, getAllMonths } = require('../controllers/Mes');

//-----------Definir rutas-----------
// User
router.post('/createUser', createUser);
router.post('/loginUser', loginUser);
router.post('/loginUserWithCookies', loginUserWithCookies);
router.get('/logoutUser', logoutUser);
router.get('/getUserData', validarToken, getUserData);
router.post('/requestVerification', sendVerificationCode);
router.post('/validateCode', validateVerificationCode);
router.post('/changePassword', changePassword);
router.post('/changePasswd', changePasswd);
router.post('/changeEmail', changeEmail);

//Tipo
router.get('/tipo', validarToken, getTipo);
router.get('/categoria', validarToken, getCategoria);
router.post('/createCategoria', validarToken, createCategoria)
router.put('/updatecategoria/:id', validarToken,updateCategoria);
router.delete('/deletecategoria/:id', validarToken, deleteCategoria);
//Movimientos
router.post('/ingresarMovimiento', validarToken, ingresarMovimiento);
router.post('/movimientos', validarToken, getMovimientos);
router.post('/movimientos2', validarToken, getMovements);
router.post('/movimientos/sumaCategorias', validarToken, getMontoPorCategoriaMovimiento);
router.post('/movimientos/sumaTipo',validarToken, getMontoPorTipoMovimiento);

//Historial
router.put('/editmovimiento/:id', validarToken, editarMovimiento);
router.delete('/deletemovimiento/:id', validarToken, eliminarMovimiento);
router.get('/categoriasTipo/:id', validarToken, getCategoriasbyTipo);

/* Presupuestos */
router.get('/presupuestos', validarToken,getPresupuesto);
router.post('/presupuestos/sumaCategoria', validarToken,getPresupuestoPorCategoria);
router.post('/presupuestos/sumaTipo',validarToken, getPresupuestoPorTipo);
router.post('/createBudget', validarToken, createBudget);
router.put('/updateBudget', validarToken, updateBudget);
router.get('/presupuestos/tipo', validarToken,getPresupuestoAgrupadoPorTipo);

/* Meses */
router.get('/dias/:month/:year', validarToken,getDiasXMes);
router.get('/meses', validarToken, getAllMonths);

module.exports = router;
