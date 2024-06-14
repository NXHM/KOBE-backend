const express    = require('express');
const router     = express.Router();

//Importar consultas
const { getTipo  } = require('../controllers/Tipo');
const { getCategoria  } = require('../controllers/Categoria');

//-----------Definir rutas-----------

//Tipo
router.get('/tipo', getTipo);
router.get('/categoria', getCategoria);


module.exports = router;