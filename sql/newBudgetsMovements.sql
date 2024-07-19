/* EJECUTAR ESTE SQL CUANDO SE TENGA UN TERCER USUARIO DENTRO DE LA BASE DE DATOS */
INSERT INTO "Category" (name, type_id, user_id) VALUES
('Auto nuevo', (SELECT id FROM "Type" WHERE name = 'Ahorro'), 3),
('Sueldo', (SELECT id FROM "Type" WHERE name = 'Ingreso'), 3),
('Transporte', (SELECT id FROM "Type" WHERE name = 'Gasto'), 3),
('Comida', (SELECT id FROM "Type" WHERE name = 'Gasto'), 3);

INSERT INTO "Budget" (amount, year, user_id, category_id, month_id) VALUES
/* enero */
(1000, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'Enero')),
(100, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'Enero')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'Enero')),

/* febrero */
(1000, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'Febrero')),
(100, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'Febrero')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'Febrero')),

/* marzo */
(1000, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'Marzo')),
(100, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'Marzo')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'Marzo')),

/* April */
(1000, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'Abril')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'Abril')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'Abril')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo'), (SELECT id FROM "Month" WHERE name = 'Abril')),

/* May */
(1250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'Mayor')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'Mayor')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'Mayor')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo'), (SELECT id FROM "Month" WHERE name = 'Mayor')),

/* June */
(1250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'Junio')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'Junio')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'Junio')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo'), (SELECT id FROM "Month" WHERE name = 'Junio')),

/* July */
(1250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'Julio')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'Julio')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'Julio')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo'), (SELECT id FROM "Month" WHERE name = 'Julio')),

/* August */
(1250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'Agosto')),
(100, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'Agosto')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'Agosto')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo'), (SELECT id FROM "Month" WHERE name = 'Agosto')),

/* September */
(1250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'Septiembre')),
(100, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'Septiembre')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'Septiembre')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo'), (SELECT id FROM "Month" WHERE name = 'Septiembre')),

/* October */
(1250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'Octubre')),
(100, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'Octubre')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'Octubre')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo'), (SELECT id FROM "Month" WHERE name = 'Octubre')),

/* November */
(1250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'Noviembre')),
(100, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'Noviembre')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'Noviembre')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo'), (SELECT id FROM "Month" WHERE name = 'Noviembre')),

/* December */
(1250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'Diciembre')),
(100, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'Diciembre')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'Diciembre')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo'), (SELECT id FROM "Month" WHERE name = 'Diciembre'));

INSERT INTO "Movement" (amount, detail, date, user_id, category_id) VALUES
/* INGRESOS */
(1000, 'Monthly salary', '2024-02-01', 3, (SELECT id FROM "Category" WHERE name = 'Sueldo')),
(1000, 'Monthly salary', '2024-03-01', 3, (SELECT id FROM "Category" WHERE name = 'Sueldo')),
(1000, 'Monthly salary', '2024-04-01', 3, (SELECT id FROM "Category" WHERE name = 'Sueldo')),
(1250, 'Monthly salary', '2024-05-01', 3, (SELECT id FROM "Category" WHERE name = 'Sueldo')),
(1250, 'Monthly salary', '2024-06-01', 3, (SELECT id FROM "Category" WHERE name = 'Sueldo')),
(1250, 'Monthly salary', '2024-07-01', 3, (SELECT id FROM "Category" WHERE name = 'Sueldo')),

/* GASTOS */
(100, 'Weekly groceries', '2024-01-02', 3, (SELECT id FROM "Category" WHERE name = 'Comida')),
(100, 'Weekly groceries', '2024-02-02', 3, (SELECT id FROM "Category" WHERE name = 'Comida')),
(100, 'Weekly groceries', '2024-03-02', 3, (SELECT id FROM "Category" WHERE name = 'Comida')),
(200, 'Weekly groceries', '2024-04-02', 3, (SELECT id FROM "Category" WHERE name = 'Comida')),
(250, 'Weekly groceries', '2024-05-02', 3, (SELECT id FROM "Category" WHERE name = 'Comida')),
(235, 'Weekly groceries', '2024-06-02', 3, (SELECT id FROM "Category" WHERE name = 'Comida')),
(80, 'Weekly groceries', '2024-07-02', 3, (SELECT id FROM "Category" WHERE name = 'Comida')),

(80, 'Bus fare', '2024-01-03', 3, (SELECT id FROM "Category" WHERE name = 'Transporte')),
(90, 'Bus fare', '2024-02-03', 3, (SELECT id FROM "Category" WHERE name = 'Transporte')),
(100, 'Bus fare', '2024-03-03', 3, (SELECT id FROM "Category" WHERE name = 'Transporte')),
(170, 'Bus fare', '2024-04-03', 3, (SELECT id FROM "Category" WHERE name = 'Transporte')),
(190, 'Bus fare', '2024-05-03', 3, (SELECT id FROM "Category" WHERE name = 'Transporte')),
(250, 'Bus fare', '2024-06-03', 3, (SELECT id FROM "Category" WHERE name = 'Transporte')),
(120, 'Bus fare', '2024-07-03', 3, (SELECT id FROM "Category" WHERE name = 'Transporte')),

/* AHORROS */
(200, 'Ahorro auto nuevo', '2024-04-03', 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo')),
(250, 'Ahorro auto nuevo', '2024-05-03', 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo')),
(250, 'Ahorro auto nuevo', '2024-06-03', 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo')),
(30, 'Ahorro auto nuevo', '2024-07-03', 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo'));