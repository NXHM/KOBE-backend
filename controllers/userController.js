const db = require("../models");
const accountValidation  = require("../validators/accountValidation")
const User = db.user; // Traigo al modelo del usuario
const Op = db.Op;

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