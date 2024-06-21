const { sequelize } = require('../db');
const { Op, Sequelize } = require('sequelize');
const Budget = require('../models/Budget')(sequelize);
const Category = require('../models/Category')(sequelize);
const Type = require('../models/Type')(sequelize);

const getPresupuesto = async (req, res) => {
    const { month_id, user_id, year_id } = req.body;

    try {
        let budgets = await Budget.findAll({
            where: {
                month_id: {
                    [Op.eq]: month_id
                },
            }
        })

        if(budgets) {
            res.send(budgets);
        } else {
            res.status(404).json({message: "No existe presupuesto para el mes ingresado."})
        }
    } catch (error) {
        console.error("Error al buscar presupuestos: ", error);
        res.status(500).json({error: "Error al buscar presupuestos."})
    }
}

const getPresupuestoPorCategoria = async (req, res) => {
    const { user_id, month_id, year_id } = req.body;

    try {
        let budgets = await Budget.findAll({
            attributes: [
                'category_id',
                'amount'
            ],
            where: {
                month_id: {
                    [Op.eq]: month_id
                },
            },
        })

        if(budgets) {
            res.send(budgets);
        } else {
            res.status(404).json({message: "No existe presupuesto para el mes ingresado."})
        }
    } catch (error) {
        console.error("Error al buscar presupuestos: ", error);
        res.status(500).json({error: "Error al buscar presupuestos."})
    }
}

const getPresupuestoPorTipo = async (req, res) => {
    const { user_id, month_id, year_id } = req.body;

    try {
        let categories = await Category.findAll();
        let budgets = await Budget.findAll({
            where: {
                month_id: {
                    [Op.eq]: month_id
                },
            },
        })

        if(budgets) {
            const montoPorTipo = budgets.reduce((acc, monto) => {
                const tipo = categories[monto.category_id-1].type_id;
                if (!acc[tipo]) {
                    acc[tipo] = 0;
                }
                acc[tipo] += monto.amount;
                return acc;
            }, {});
            res.send({montoPorTipo});
        } else {
            res.status(404).json({message: "No existe presupuesto para el mes ingresado."})
        }
    } catch (error) {
        console.error("Error al buscar presupuestos: ", error);
        res.status(500).json({error: "Error al buscar presupuestos."})
    }
}

module.exports = {
    getPresupuesto,
    getPresupuestoPorCategoria,
    getPresupuestoPorTipo,
}