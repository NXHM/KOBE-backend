const { connection, Category, Budget, Month,sequelize,Type} = require('../models/db');
const { Op } = require('sequelize');
const db = require("../models/db");

const getCategoria = async (req, res) => {
    const { user_id } = req.body;

    try {
        const categorias = await Category.findAll({
            where: {
                user_id: {
                    [Op.eq]: user_id,
                },
            },
            include: [{ model: Type }],
        });

        if (categorias.length > 0) {
            // Agrupar categorías por tipo
            const groupedByType = categorias.reduce((acc, categoria) => {
                const type = categoria.Type.name;
                if (!acc[type]) {
                    acc[type] = [];
                }
                acc[type].push(categoria);
                return acc;
            }, {});

            res.status(200).json(groupedByType);
        } else {
            res.status(404).json({ message: "No existen categorías." });
        }
    } catch (error) {
        console.error("Error al buscar categorías: ", error);
        res.status(500).json({ error: "Error al buscar categorías." });
    }
};

const getCategoriaById = async (req, res) => {
    const { category_id } = req.params;
    const user_id = req.id;

    try {
        const category = await Category.findOne({
            where: {
                id: category_id,
                user_id: user_id
            },
            include: [{
                model: Type,
                attributes: ['id', 'name']
            }]
        });

        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        res.status(200).json({
            id: category.id,
            name: category.name,
            type_id: category.type_id,
            type_name: category.Type.name
        });
    } catch (error) {
        console.error('Error al obtener la categoría:', error);
        res.status(500).json({ error: 'Error al obtener la categoría' });
    }
};

const getCategoriaConTipos = async (req, res) => {
    const user_id = req.id;
    try {
  
      const types = await Type.findAll({
        include: [
          {
            model: Category,
            where: {
              user_id: user_id
            }
          }
        ]
      });
  
      res.json(types);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const createCategoria = async (req, res) => {
    const { name, type_id, user_id } = req.body;

    try {
        // Crear la categoría
        const newCategory = await Category.create({
            name,
            type_id,
            user_id // Incluir user_id al crear la categoría
        });

        // Obtener todos los meses
        const months = await Month.findAll();

        // Crear registros en Budget para cada mes hasta 2026
        const budgets = [];
        for (let year = new Date().getFullYear(); year <= 2026; year++) {
            for (let month of months) {
                budgets.push({
                    amount: 0,
                    year: year,
                    category_id: newCategory.id, // Correctamente usar newCategory.id
                    month_id: month.id, // Correctamente usar month.id
                    user_id: user_id // Correctamente usar user_id de los params
                });
            }
        }

        await Budget.bulkCreate(budgets);

        return res.status(201).json({
            message: "Category and associated budgets created successfully",
            category: newCategory
        });
    } catch (error) {
        console.error('Error creating category and budgets:', error);
        return res.status(500).json({ error: 'Error creating category and budgets' });
    }
};


const updateCategoria = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const query = `
    UPDATE "Category"
    SET name = $1
    WHERE id = $2
    RETURNING *;
  `;

    const values = [name, id];

    try {
        const { rows } = await connection.query(query, values);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        res.status(200).json({
            mensaje: "Categoría actualizada correctamente",
            categoria: rows[0],
        });
        console.log("Categoría editada correctamente");
    } catch (error) {
        console.error("Error al editar categoría:", error);
        res.status(500).json({
            error: "Hubo un problema al editar la categoría",
        });
    }
};


const deleteCategoria = async (req, res) => {
    const { id } = req.params;

    try {
        await sequelize.transaction(async (t) => {
            // Eliminar registros en Budget relacionados con la categoría
            await Budget.destroy({
                where: { category_id: id },
                transaction: t
            });

            // Eliminar la categoría
            const result = await Category.destroy({
                where: { id: id },
                transaction: t
            });

            if (result === 0) {
                return res.status(404).json({ error: 'Category not found' });
            }

            return res.status(200).json({ message: 'Category and associated budgets deleted successfully' });
        });
    } catch (error) {
        console.error('Error deleting category and budgets:', error);
        return res.status(500).json({ error: 'Error deleting category and budgets' });
    }
};


module.exports = {
    getCategoria,
    createCategoria,
    updateCategoria,
    deleteCategoria,
    getCategoriaConTipos,
    getCategoriaById
};
