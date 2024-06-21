const express    = require('express');
const router     = express.Router();

//Importar consultas
const { getTipo  } = require('../controllers/Tipo');
const { getCategoria  } = require('../controllers/Categoria');
const { ingresarMovimiento  } = require('../controllers/Movimiento');
const { changeEmail, changePasswd } = require('../controllers/userController');

//-----------Definir rutas-----------
// User
router.post('/changePasswd', changePasswd);
router.post('/changeEmail', changeEmail);

//Tipo
router.get('/tipo', getTipo);
router.get('/categoria', getCategoria);
router.post('/ingresarMovimiento', ingresarMovimiento);


module.exports = router;