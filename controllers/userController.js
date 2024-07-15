const db = require("../models/db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();
const { validateUsername, validatePassword, validateEmail } = require("../validators/accountValidation")
const verificationCodes = {};

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
    // Verifica si ya existe ese email
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(401).json({error:"El correo ya está en uso. Por favor, utiliza otro correo."});
    }
    if (req.body.confirmPassword == req.body.password) {
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
  }
  res.status(422).json({ errors: errors });
};

const loginUser = async (req, res) => {
  try {
    const username = req.body.username;
  
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
  
    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }
  
    const equalsPasswords = await bcrypt.compare(req.body.password, user.password);
    if (equalsPasswords) {
      const token = jwt.sign(
        {
          username: user.username,
          userId: user.userId,
        },
        "ClaveSecreta", // La clave secreta
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({
        message: "Usuario logueado",
        token: token,
      });
    } else {
      return res.status(401).json({
        message: "Contraseña incorrecta",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error al buscar el usuario",
      error: error.message,

    });
  }
};

module.exports = {
  loginUser,
};

// Envia el email para la recuperación de contraseña
const sendVerificationCode = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "Email no registrado." });
  }
  // Crea un código de verificación
  // padStart: rellena con ceros a la izquierda hasta que tenga 6 caracteres
  let verificationCode = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

  // Almacenar el código con un tiempo de expiración (15 minutos)
  verificationCodes[email] = {
    code: verificationCode,
    expiry: Date.now() + 15 * 60 * 1000
  };

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    }
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Código de verificación para cambio de contraseña",
    text: `Tu código de verificación es ${verificationCode}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Código de verificación enviado" });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ error: "Error al enviar el código de verificación" });
  }
};

const validateVerificationCode = async (req, res) => {
  const { email, verificationCode } = req.body;

  if (verificationCodes[email] &&
    verificationCodes[email].code === verificationCode &&
    verificationCodes[email].expiry > Date.now()) {

    // Marcar el código como verificado pero no eliminarlo aún
    verificationCodes[email].verified = true;

    res.status(200).json({ message: "Código de verificación válido" });
  } else {
    res.status(400).json({ error: "Código de verificación inválido o expirado" });
  }
};

const changePassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  // Verificar si el código fue validado previamente
  if (!verificationCodes[email] || !verificationCodes[email].verified) {
    return res.status(400).json({ error: "Debe verificar el código primero" });
  }

  // Verificar que las contraseñas coincidan
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "Las contraseñas no coinciden" });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update(
      { password: hashedPassword },
      { where: { email: email } }
    );

    // Eliminar el código de verificación después de usarlo
    delete verificationCodes[email];

    res.status(200).json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    res.status(500).json({ error: "Error al actualizar la contraseña" });
  }
};


// Cambio de correo
const changeEmail = async (req, res) => {
  const { userId, newEmail } = req.body

  await User.update(
    { email: newEmail },
    { where: { id: userId } }
  );

  res.send('Email changed succesfully!');
};

// Cambio de contraseña
const changePasswd = async (req, res) => {
  const { userId, newPassword } = req.body

  await User.update(
    { password: newPassword },
    { where: { id: userId } }
  );

  res.send('Password changed succesfully!');
};

module.exports = {
  createUser,
  loginUser,
  changePassword,
  changeEmail,
  changePasswd,
  sendVerificationCode,
  validateVerificationCode
}