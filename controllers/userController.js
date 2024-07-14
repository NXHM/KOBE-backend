const db = require("../models/db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();
const { validateUsername, validatePassword, validateEmail } = require("../validators/accountValidation")
const User = db.User; // Traigo al modelo del usuario

// Crear usuario
const createUser = async (req, res) => {
  let errors = validateUsername(req);
  if (!errors) {
    errors = validatePassword(req);
  }
  if (!errors) {
    errors = validateEmail(req);
  }
  if (!errors) {
    
    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Crea la cuenta
    const user = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      //userId: req.body.userId,
    };

    const result = await User.create(user);

    return res.status(200).json({
      message: "User account created succesfully",
      result: result,
    });
  }
  res.status(422).json({ errors: errors });
};

// Iniciar Sesión
const loginUser = async (req, res) => {
  const username = req.body.username;
  const user = await User.findOne({
    where: {
      username: username,
    },
  });
  const equalsPasswords = await bcrypt.compare(req.body.password, user.password);
  if (equalsPasswords) {
    const token = jwt.sign(
      {
        username: user.username,
        //userId: user.userId,
      },
      "ClaveSecreta", // La clave secreta
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({
      message: "User logged in",
      token: token,
    });
  }
}

// Envia el email para la recuperación de contraseña
const sendEmail = async (to) => {
  // Crea un código de verificación
  // padStart: rellena con ceros a la izquierda hasta que tenga 6 caracteres
  let verificationCode = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

  // Configura el objeto de transporte con los datos del correo
  let transporter = nodemailer.createTransport({
    service: 'gmail', // usa Gmail como servicio
    auth: {
      user: process.env.EMAIL, // tu correo electrónico
      pass: process.env.PASSWORD, // tu contraseña
    },
  });

  // Configura las opciones del correo
  let mailOptions = {
    from: process.env.EMAIL, // email de quien envía
    to: to, // correo de recuperacion
    subject: "Changing Password", // Asunto
    text:`Tu código de verificación es ${verificationCode}`, //Código de recuperacion"
  };

  // Enviar correo con el objeto de transporte definido
  let info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
  return verificationCode;
};

// Cambiar contraseña
const changePassword = async (req, res) => {
  // Envia el correo de recuperación y espera el código
  const verification_code = sendEmail(req.body.email); 
  const user_code = req.body.verificationCode;
  if(verification_code === user_code){
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    const result = await User.update(
      { password: hashedPassword },
      { where: { email: req.body.email } }
    );
    return res.status(200).json({
      message: "User password updated succesfully",
      result: result,
    });
  }
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
  createUser,
  loginUser,
  changePassword,
  changeEmail,
  changePasswd
}