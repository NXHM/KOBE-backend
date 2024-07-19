const db = require('../models/db');

const Sequelize = db.Sequelize;
const Op = db.Op; 
const Budget = db.Budget;
const Category = db.Category;
const Type = db.Type;

const createBudget = async (req, res) => {
    const { amount, year, month_id, category_name, type_id } = req.body;
    const user_id = req.id; // Extraer user_id del middleware

    try {
        // Verificar si la categoría ya existe
        let category = await Category.findOne({
            where: {
                name: category_name,
                user_id: user_id,
                type_id: type_id
            }
        });

        // Si no existe, crear la categoría
        if (!category) {
            category = await Category.create({
                name: category_name,
                type_id: type_id,
                user_id: user_id
            });
        }

        // Crear el presupuesto asociado a la categoría para el mes y año especificado
        const newBudget = await Budget.create({
            amount,
            year,
            user_id,
            category_id: category.id,
            month_id
        });

        // Crear presupuestos adicionales con monto 0 para los años 2024 a 2026
        const startYear = 2024;
        const endYear = 2026;

        for (let y = startYear; y <= endYear; y++) {
            for (let m = 1; m <= 12; m++) {
                // Saltar el presupuesto ya creado con el monto especificado
                if (y === year && m === month_id) continue;

                // Verificar si ya existe un presupuesto para esa combinación de year y month_id
                const existingBudget = await Budget.findOne({
                    where: {
                        year: y,
                        month_id: m,
                        user_id: user_id,
                        category_id: category.id
                    }
                });

                if (y < year || (m < month_id && y===year)) {
                    await Budget.create({
                        amount: 0,
                        year: y,
                        user_id: user_id,
                        category_id: category.id,
                        month_id: m
                    });
                } else if (!existingBudget) {
                    await Budget.create({
                        amount: amount,
                        year: y,
                        user_id: user_id,
                        category_id: category.id,
                        month_id: m
                    });
                }
            }
        }

        return res.status(201).json({
            message: "Budget created successfully",
            budget: newBudget,
            category: category
        });
    } catch (error) {
        console.error('Error creating budget:', error);
        return res.status(500).json({ error: 'Error creating budget' });
    }
};




const getPresupuesto = async (req, res) => {
    const { category_id, month_id, year } = req.query;
    const user_id = req.id; // Obtener el user_id desde req.id

    try {
        let budget = await Budget.findOne({
            where: {
                category_id: category_id,
                month_id: month_id,
                year: year,
                user_id: user_id,
            },
            include: [
                {
                    model: Category,
                    attributes: ['name'],
                }
            ],
        });

        if (budget) {
            res.send(budget);
        } else {
            res.status(404).json({ message: "No existe presupuesto para los parámetros ingresados." });
        }
    } catch (error) {
        console.error("Error al buscar presupuesto: ", error);
        res.status(500).json({ error: "Error al buscar presupuesto." });
    }
};

const getPresupuestoAgrupadoPorTipo = async (req, res) => {
    const { month_id, year } = req.query; // Obtener los parámetros de consulta
    const user_id = req.id;

    try {
        let budgets = await Budget.findAll({
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
            res.status(404).json({ message: "No existen presupuestos para el mes y año ingresado." });
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
    const { month_id, year } = req.body;
    const user_id = req.id;
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
    const { id, amount } = req.body;
    const user_id = req.id; // Obtener el user_id desde req.id

    if (!id || amount === undefined) {
        return res.status(400).json({ error: "Parámetros incompletos." });
    }

    try {
        const [updated] = await Budget.update(
            { amount },
            {
                where: {
                    id: id,
                    user_id: user_id,
                },
            }
        );

        if (updated) {
            const updatedBudget = await Budget.findOne({ where: { id: id } });
            res.status(200).json(updatedBudget);
        } else {
            res.status(404).json({ error: "Presupuesto no encontrado." });
        }
    } catch (error) {
        console.error("Error al actualizar el presupuesto: ", error);
        res.status(500).json({ error: "Error al actualizar el presupuesto." });
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