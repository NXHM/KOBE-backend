const db = require('../models/db');

const Sequelize = db.Sequelize;
const Op = db.Op; 
const Budget = db.Budget;
const Category = db.Category;
const Type = db.Type;

const getPresupuesto = async (req, res) => {
    const { month_id, user_id} = req.body;

    try {
        let budgets = await Budget.findAll({
            where: {
                month_id: {
                    [Op.eq]: month_id,
                },
                user_id: {
                    [Op.eq]: user_id,
                },
            },
            include: [
                {model: Category,
                    attributes: [
                        'name'
                    ],
                }
            ],
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
    const { user_id, month_id} = req.body;

    try {
        let budgets = await Budget.findAll({
            attributes: [
                'category_id',
                [Sequelize.col('Category.name'), 'category_name'],
                'amount'
            ],
            where: {
                user_id: {
                    [Op.eq]: user_id
                },
                month_id: {
                    [Op.eq]: month_id
                },
            },
            include: [
                {model: Category,
                    attributes: [],
                }
            ],
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
        let budgets = await Budget.findAll({
            attributes: [
                [Sequelize.col('Category.type_id'), 'type_id'],
                [Sequelize.col('Category.Type.name'), 'type_name'],
                [Sequelize.fn('SUM', Sequelize.col('amount')), 'total_amount']
            ],
            where: {
                user_id: {
                    [Op.eq]: user_id
                },
                month_id: {
                    [Op.eq]: month_id
                },
            },
            include: [
                {model: Category,
                    attributes: [],
                    include: [{model: Type,
                        attributes: [],
                    }],
                }
            ],
            group: ['Category.type_id', 'Category.Type.name'],
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

module.exports = {
    getPresupuesto,
    getPresupuestoPorCategoria,
    getPresupuestoPorTipo,
}