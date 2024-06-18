<<<<<<< HEAD
const Router = require("express");
const multer = require("multer");
=======
const express    = require('express');
const router     = express.Router();

//Importar consultas
const { getTipo  } = require('../controllers/Tipo');
const { getCategoria  } = require('../controllers/Categoria');
const { ingresarMovimiento  } = require('../controllers/Movimiento');
//-----------Definir rutas-----------

//Tipo
router.get('/tipo', getTipo);
router.get('/categoria', getCategoria);
router.post('/ingresarMovimiento', ingresarMovimiento);


module.exports = router;
>>>>>>> 389509bf25c67cf1054e5e4fc281019f12ef38aa
