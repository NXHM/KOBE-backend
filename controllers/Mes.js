const db = require("../models/db");

const Sequelize = db.Sequelize;
const Op = db.Op;
const Month = db.Month;

const getDiasXMes = async (req, res) => {
    const { month, year } = req.params;
    const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    try {
        if (month == 2){
            const isLeapYear = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
            res.send(isLeapYear? {"dias": daysPerMonth[month-1] + 1} :  {"dias": daysPerMonth[month-1]});
        } else {
            res.send({"dias": daysPerMonth[month-1]});
        }
    } catch (error) {
        console.error("Error al recuperar el día según el mes: ", error);
        res.status(500).json({error: "Error al recuperar el día según el mes."})
    }
}


const getAllMonths = async (req, res) => {
  try {
    const months = await Month.findAll();
    res.status(200).json(months);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}


module.exports = {
    getDiasXMes,
    getAllMonths
}