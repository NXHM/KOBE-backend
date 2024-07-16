/* EJECUTAR ESTE SQL CUANDO SE TENGA UN TERCER USUARIO DENTRO DE LA BASE DE DATOS */
INSERT INTO "Category" (name, type_id, user_id) VALUES
('Auto nuevo', (SELECT id FROM "Type" WHERE name = 'Ahorro'), 3),
('Sueldo', (SELECT id FROM "Type" WHERE name = 'Ingreso'), 3),
('Transporte', (SELECT id FROM "Type" WHERE name = 'Gasto'), 3),
('Comida', (SELECT id FROM "Type" WHERE name = 'Gasto'), 3);

INSERT INTO "Budget" (amount, year, user_id, category_id, month_id) VALUES
/* enero */
(1000, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'January')),
(100, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'January')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'January')),

/* febrero */
(1000, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'February')),
(100, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'February')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'February')),

/* marzo */
(1000, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'March')),
(100, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'March')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'March')),

/* April */
(1000, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'April')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'April')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'April')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo'), (SELECT id FROM "Month" WHERE name = 'April')),

/* May */
(1250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'May')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'May')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'May')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo'), (SELECT id FROM "Month" WHERE name = 'May')),

/* June */
(1250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'June')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'June')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'June')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo'), (SELECT id FROM "Month" WHERE name = 'June')),

/* July */
(1250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'July')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'July')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'July')),
(250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo'), (SELECT id FROM "Month" WHERE name = 'July')),

/* August */
(1250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'August')),
(100, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'August')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'August')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo'), (SELECT id FROM "Month" WHERE name = 'August')),

/* September */
(1250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'September')),
(100, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'September')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'September')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo'), (SELECT id FROM "Month" WHERE name = 'September')),

/* October */
(1250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'October')),
(100, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'October')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'October')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo'), (SELECT id FROM "Month" WHERE name = 'October')),

/* November */
(1250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'November')),
(100, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'November')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'November')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo'), (SELECT id FROM "Month" WHERE name = 'November')),

/* December */
(1250, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'December')),
(100, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'December')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'December')),
(150, 2024, 3, (SELECT id FROM "Category" WHERE name = 'Auto nuevo'), (SELECT id FROM "Month" WHERE name = 'December'));

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