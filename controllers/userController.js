const { password } = require("../config/db-config");
const {db} = require("../db");
const accountValidation  = require("../validators/accountValidation")
const User = db.User; // Traigo al modelo del usuario

// Crear usuario
exports.create = async(req, res) => {
    const errors = accountValidation(req.body);
    if (errors.isEmpty()) {
      // user Id
      const userId = req.userId;
  
    // Crea la cuenta
      const account = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        userId: userId,
      }; 
      
        const result = await Account.create(account);

        return res.status(200).json({
        message: "Account created succesfully",
        result: result,
        });
    }
    res.status(422).json({ errors: errors.array() });
};

// Cambio de correo
const changeEmail = async(req, res) => {
  const {userId, newEmail} = req.body

  await User.update(
    {email: newEmail},
    {where: {id: userId}}
  );
  
  res.send('Email changed succesfully!');
};

// Cambio de contraseña
const changePasswd = async(req, res) => {
  const {userId, newPassword} = req.body

  await User.update(
    {password: newPassword},
    {where: {id: userId}}
  );
  
  res.send('Password changed succesfully!');
};

module.exports = {
  changeEmail,
  changePasswd
};