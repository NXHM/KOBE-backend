const { sequelize } = require('../db');
const Month = require("../models/Month")(sequelize);
const Year = require("../models/Year")(sequelize);

const getDiasXMes = async (req, res) => {
    const {month_id, year_id} = req.body;

    try {
        let month = await Month.findByPk(month_id);
        let year = await Year.findByPk(year_id);

        if (month && year) {
            if (month.id == 2){
                const isLeapYear = (year.name % 4 == 0 && (year.name % 100 != 0 || year.name % 400 == 0));
                res.send(isLeapYear? {"dias": month.days + 1} :  {"dias": month.days});
            } else {
                res.send({"dias": month.days});
            }
        } else {
            res.status(404).json({message: "Error al buscar el mes"});
        }
        
    } catch (error) {
        console.error("Error al buscar los meses: ", error);
        res.status(500).json({error: "Error al buscar los meses."})
    }
}

module.exports = {
    getDiasXMes,
}