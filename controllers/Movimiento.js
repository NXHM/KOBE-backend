const { connection, Category,Type } = require("../models/db");
const db = require("../models/db");

const Sequelize = db.Sequelize;
const Op = db.Op;
const Movement = db.Movement;

const ingresarMovimiento = async (req, res) => {
    const { amount, detail, date, category_id } =
        req.body;
    const user_id = req.id;

    const query = `
      INSERT INTO "Movement" (amount, detail, date, user_id, category_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [
        amount, detail, date, user_id, category_id
    ];

    try {
        const { rows } = await connection.query(query, values);
        res.status(201).json({
            mensaje: "Movimiento creado correctamente",
            movimiento: rows[0],
        });
        console.log("Se ingreso movimiento");
    } catch (error) {
        console.error("Error al crear movimiento:", error);
        res.status(500).json({
            error: "Hubo un problema al crear el movimiento",
        });
    }
};

const getMovements = async (req, res) => {
    const user_id = req.id; // Extraer user_id del middleware

    try {
        // Buscar todos los movimientos del usuario
        const movements = await Movement.findAll({
            where: {
                user_id: user_id
            },
            attributes: ['id', 'amount', 'detail', 'date'],
            include: [
                {
                    model: Category,
                    attributes: ['name'],
                    include: [
                        {
                            model: Type,
                            attributes: ['name']
                        }
                    ]
                }
            ],
            order: [['date', 'ASC']]
        });

        if (movements.length > 0) {
            // Formatear la respuesta
            const formattedMovements = movements.map(movement => ({
                id: movement.id,
                date: movement.date,
                type: movement.Category.Type.name,
                category: movement.Category.name,
                amount: movement.amount,
                detail: movement.detail
            }));

            res.status(200).json(formattedMovements);
        } else {
            res.status(404).json({ message: "No movements found for the user." });
        }
    } catch (error) {
        console.error('Error fetching movements:', error);
        res.status(500).json({ error: 'Error fetching movements.' });
    }
};


const getMovimientos = async (req, res) => {
    const { user_id, year, month } = req.body;

    try {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        const movimientos = await Movement.findAll({
            where: {
                user_id: {
                    [Op.eq]: user_id,
                },
                date: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate,
                },
            },
            include: [{ model: db.Category }],
        });

        if (movimientos) {
            res.send(movimientos);
        } else {
            res.status(404).json({ message: "No existen movimientos." });
        }
    } catch (error) {
        console.error("Error al buscar movimientos: ", error);
        res.status(500).json({ error: "Error al buscar movimientos." });
    }
};

const getMontoPorCategoriaMovimiento = async (req, res) => {
    const { user_id, year, month } = req.body;

    try {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        const movimientos = await Movement.findAll({
            attributes: [
                "category_id",
                [Sequelize.col("Category.name"), "category_name"],
                [Sequelize.fn("SUM", Sequelize.col("amount")), "total_amount"],
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

        if (movimientos) {
            res.send(movimientos);
        } else {
            res.status(404).json({ message: "No existen movimientos." });
        }
    } catch (error) {
        console.error("Error al buscar movimientos: ", error);
        res.status(500).json({ error: "Error al buscar movimientos." });
    }
};

const getMontoPorTipoMovimiento = async (req, res) => {
    const { user_id, year, month } = req.body;

    try {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        const movimientos = await Movement.findAll({
            attributes: [
                [Sequelize.col("Category.type_id"), "type_id"],
                [Sequelize.col("Category.Type.name"), "type_name"],
                [Sequelize.fn("SUM", Sequelize.col("amount")), "total_amount"],
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
            include: [
                {
                    model: db.Category,
                    attributes: [],
                    include: [{ model: db.Type, attributes: [] }],
                },
            ],
            group: ["Category.type_id", "Category.Type.name"],
        });

        if (movimientos) {
            res.send(movimientos);
        } else {
            res.status(404).json({ message: "No existen movimientos." });
        }
    } catch (error) {
        console.error("Error al buscar movimientos: ", error);
        res.status(500).json({ error: "Error al buscar movimientos." });
    }
};

const editarMovimiento = async (req, res) => {
    const { id } = req.params;
    const { date, category_id, amount, detail } = req.body;

    const query = `
    UPDATE "Movement"
    SET date = $1, category_id = $2, amount = $3, detail = $4
    WHERE id = $5
    RETURNING *;
  `;

    const values = [date, category_id, amount, detail, id];

    try {
        const { rows } = await connection.query(query, values);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Movimiento no encontrado" });
        }
        res.status(200).json({
            mensaje: "Movimiento actualizado correctamente",
            movimiento: rows[0],
        });
        console.log("Movimiento editado correctamente");
    } catch (error) {
        console.error("Error al editar movimiento:", error);
        res.status(500).json({
            error: "Hubo un problema al editar el movimiento",
        });
    }
};

const eliminarMovimiento = async (req, res) => {
    const { id } = req.params;

    const query = `
    DELETE FROM "Movement"
    WHERE id = $1
    RETURNING *;
  `;

    const values = [id];

    try {
        const { rows } = await connection.query(query, values);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Movimiento no encontrado" });
        }
        res.status(200).json({
            mensaje: "Movimiento eliminado correctamente",
            movimiento: rows[0],
        });
        console.log("Movimiento eliminado correctamente");
    } catch (error) {
        console.error("Error al eliminar movimiento:", error);
        res.status(500).json({
            error: "Hubo un problema al eliminar el movimiento",
        });
    }
};



module.exports = {
    ingresarMovimiento,
    getMovimientos,
    getMovements,
    getMontoPorCategoriaMovimiento,
    getMontoPorTipoMovimiento,
    editarMovimiento,
    eliminarMovimiento
};
