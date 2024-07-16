const jwt = require('jsonwebtoken');

const validarToken = (req, res, next) => {
  // Obtener el token del header
  const token = req.header('Authorization');

  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({ error: 'No hay token, permiso denegado' });
  }

  try {
    // Verificar el token
    const cifrado = jwt.verify(token, "ClaveSecreta");
    req.id = cifrado.id;
    next(); // Pasar al siguiente middleware
  } catch (error) {
    // Proporcionar mensajes de error específicos basados en el tipo de error
    if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: 'Token expirado' });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: 'Token no válido' });
      } else {
        return res.status(401).json({ error: 'Error al verificar el token' });
      }
  }
};

module.exports = {validarToken};