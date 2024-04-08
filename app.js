const express = require('express');
const sequelize = require('./db'); 
const User = require('./models/User.js'); 

const app = express();

sequelize.sync({ force: true }) 
  .then(() => {
    console.log('Database & tables created!');
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});