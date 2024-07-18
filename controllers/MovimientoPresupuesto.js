const db = require('../models/db');

const Sequelize = db.Sequelize;
const Op = db.Op; 
const Budget = db.Budget;
const Category = db.Category;
const Type = db.Type;
const Movement = db.Movement;

const getMovimientosYPresupuestosPorCategoria = async (req, res) => {
    const user_id = req.id;
    console.log(user_id);
    const { year, month } = req.body;

    try {
        const startDate = new Date(year, month - 1, 1);
        console.log('Start Date:', startDate);
        const endDate = new Date(year, month, 1);
        console.log('End Date:', endDate);

        // Obtener movimientos por categoría
        const movimientos = await Movement.findAll({
            attributes: [
                "category_id",
                [Sequelize.col("Category.name"), "category_name"],
                [Sequelize.fn("SUM", Sequelize.col("amount")), "real"],
            ],
            where: {
                user_id: {
                    [Op.eq]: user_id,
                },
                date: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate,
                },
            },
            include: [{ model: db.Category, attributes: [] }],
            group: ["category_id", "Category.name"],
        });

        // Obtener presupuestos por categoría
        const presupuestos = await Budget.findAll({
            attributes: [
                [Sequelize.col('Category.type_id'), 'type_id'],
                'category_id',
                [Sequelize.col('Category.name'), 'category_name'],
                'amount'
            ],
            where: {
                user_id: {
                    [Op.eq]: user_id
                },
                month_id: {
                    [Op.eq]: month
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
                            attributes: [],
                        }
                    ]
                }
            ],
        });

        // Combinar resultados
        const result = {
            ingresos: [],
            gastos: [],
            ahorros: []
        };

        const movimientosMap = new Map();
        movimientos.forEach(mov => {
            movimientosMap.set(mov.dataValues.category_id, mov.dataValues.real);
        });

        presupuestos.forEach(presupuesto => {
            const movimiento = movimientosMap.get(presupuesto.dataValues.category_id);
            const categoryData = {
                nombre_categoria: presupuesto.dataValues.category_name,
                real: movimiento ? parseFloat(movimiento) : 0,
                planeado: parseFloat(presupuesto.dataValues.amount)
            };
            if (categoryData.planeado > 0) {
                switch (presupuesto.dataValues.type_id ) {
                    case 1:
                        result.ingresos.push(categoryData);
                        break;
                    case 2:
                        result.gastos.push(categoryData);
                        break;
                    case 3:
                        result.ahorros.push(categoryData);
                        break;
                }
            }
        });

        //res.send(presupuestos)
/*         console.log(result.ingresos);
        console.log(result.gastos);
        console.log(result.ahorros); */
        res.send([result.ingresos, result.gastos, result.ahorros]);
    } catch (error) {
        console.error("Error al buscar movimientos y presupuestos por categoría: ", error);
        res.status(500).json({ error: "Error al buscar movimientos y presupuestos por categoría." });
    }
};

module.exports = {
    getMovimientosYPresupuestosPorCategoria,
}