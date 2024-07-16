const db = require('../models/db');

const Sequelize = db.Sequelize;
const Op = db.Op; 
const Budget = db.Budget;
const Category = db.Category;
const Type = db.Type;

const createBudget = async (req, res) => {
    const { amount, year, user_id, category_id, month_id } = req.body;

    try {
        const newBudget = await Budget.create({
            amount,
            year,
            user_id,
            category_id,
            month_id
        });

        return res.status(201).json({
            message: "Budget created successfully",
            budget: newBudget
        });
    } catch (error) {
        console.error('Error creating budget:', error);
        return res.status(500).json({ error: 'Error creating budget' });
    }
};

const getPresupuesto = async (req, res) => {
    const { month_id, user_id } = req.body;

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
                {
                    model: Category,
                    attributes: ['name'],
                }
            ],
        });

        if (budgets.length > 0) {
            res.send(budgets);
        } else {
            res.status(404).json({ message: "No existe presupuesto para el mes ingresado." });
        }
    } catch (error) {
        console.error("Error al buscar presupuestos: ", error);
        res.status(500).json({ error: "Error al buscar presupuestos." });
    }
};

const getPresupuestoAgrupadoPorTipo = async (req, res) => {
    const { user_id, month_id } = req.body;

    try {
        let budgets = await Budget.findAll({
            where: {
                user_id: {
                    [Op.eq]: user_id
                },
                month_id: {
                    [Op.eq]: month_id
                },
            },
            include: [
                {
                    model: Category,
                    attributes: ['id', 'name', 'type_id'],
                    include: [
                        {
                            model: Type,
                            attributes: ['id', 'name']
                        }
                    ]
                }
            ],
        });

        if (budgets.length > 0) {
            // Agrupar los presupuestos por tipo
            let groupedBudgets = budgets.reduce((result, budget) => {
                const type = budget.Category.Type;
                if (!result[type.id]) {
                    result[type.id] = {
                        type: type.name,
                        budgets: []
                    };
                }
                result[type.id].budgets.push({
                    id: budget.id,
                    amount: budget.amount,
                    year: budget.year,
                    month_id: budget.month_id,
                    category_id: budget.category_id,
                    category_name: budget.Category.name,
                });
                return result;
            }, {});

            // Convertir el objeto en un array
            let response = Object.values(groupedBudgets);

            res.send(response);
        } else {
            res.status(404).json({ message: "No existen presupuestos para el mes ingresado." });
        }
    } catch (error) {
        console.error("Error al buscar presupuestos agrupados por tipo: ", error);
        res.status(500).json({ error: "Error al buscar presupuestos agrupados por tipo." });
    }
};

const getPresupuestoPorCategoria = async (req, res) => {
    const { user_id, month_id } = req.body;

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
                {
                    model: Category,
                    attributes: [],
                }
            ],
        });

        if (budgets.length > 0) {
            res.send(budgets);
        } else {
            res.status(404).json({ message: "No existe presupuesto para el mes ingresado." });
        }
    } catch (error) {
        console.error("Error al buscar presupuestos por categoría: ", error);
        res.status(500).json({ error: "Error al buscar presupuestos por categoría." });
    }
};


const getPresupuestoPorTipo = async (req, res) => {
    const { user_id, month_id, year } = req.body;

    try {
        let budgets = await Budget.findAll({
            attributes: [
                'id',
                'amount',
                'year',
                'month_id',
                [Sequelize.col('Category.id'), 'category_id'],
                [Sequelize.col('Category.name'), 'category_name'],
                [Sequelize.col('Category.type_id'), 'type_id'],
                [Sequelize.col('Category.Type.name'), 'type_name']
            ],
            where: {
                user_id: {
                    [Op.eq]: user_id
                },
                month_id: {
                    [Op.eq]: month_id
                },
                year: {
                    [Op.eq]: year
                }
            },
            include: [
                {
                    model: Category,
                    attributes: [],
                    include: [
                        {
                            model: Type,
                            attributes: []
                        }
                    ]
                }
            ],
            order: [['Category', 'type_id', 'ASC']] // Ordenar por type_id para mantener los presupuestos agrupados por tipo
        });

        if (budgets.length > 0) {
            res.send(budgets);
        } else {
            res.status(404).json({ message: "No existe presupuesto para el mes y año ingresados." });
        }
    } catch (error) {
        console.error("Error al buscar presupuestos por tipo: ", error);
        res.status(500).json({ error: "Error al buscar presupuestos por tipo." });
    }
};



const updateBudget = async (req, res) => {
    const { id } = req.params;
    const { amount, year, user_id, category_id, month_id } = req.body;

    try {
        const budget = await Budget.findByPk(id);

        if (!budget) {
            return res.status(404).json({ error: 'Budget not found' });
        }

        budget.amount = amount;
        budget.year = year;
        budget.user_id = user_id;
        budget.category_id = category_id;
        budget.month_id = month_id;

        await budget.save();

        return res.status(200).json({
            message: "Budget updated successfully",
            budget: budget
        });
    } catch (error) {
        console.error('Error updating budget:', error);
        return res.status(500).json({ error: 'Error updating budget' });
    }
};

module.exports = {
    getPresupuesto,
    getPresupuestoPorCategoria,
    getPresupuestoPorTipo,
    createBudget,
    updateBudget,
    getPresupuestoAgrupadoPorTipo
}