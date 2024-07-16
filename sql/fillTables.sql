-- Insertar datos en la tabla Month
INSERT INTO "Month" (name) VALUES
('January'),
('February'),
('March'),
('April'),
('May'),
('June'),
('July'),
('August'),
('September'),
('October'),
('November'),
('December');

-- Insertar datos en la tabla Type
INSERT INTO "Type" (name) VALUES
('Ingreso'),
('Gasto'),
('Ahorro');

-- Insertar datos en la tabla User
INSERT INTO "User" (name, username, email, password) VALUES
('John Doe', 'johndoe', 'john@example.com', 'password123'),
('Jane Smith', 'janesmith', 'jane@example.com', 'password456');

-- Insertar datos en la tabla Category
INSERT INTO "Category" (name, type_id, user_id) VALUES
('Sueldo', (SELECT id FROM "Type" WHERE name = 'Ingreso'), (SELECT id FROM "User" WHERE name = 'Jhon Doe')),
('Predefinido', (SELECT id FROM "Type" WHERE name = 'Ahorro'), (SELECT id FROM "User" WHERE name = 'Jhon Doe')),
('Transporte', (SELECT id FROM "Type" WHERE name = 'Gasto'), (SELECT id FROM "User" WHERE name = 'Jhon Doe')),
('Comida', (SELECT id FROM "Type" WHERE name = 'Gasto'), (SELECT id FROM "User" WHERE name = 'Jhon Doe')),
('Fiestas', (SELECT id FROM "Type" WHERE name = 'Gasto'), (SELECT id FROM "User" WHERE name = 'Jhon Doe'));

-- Insertar datos en la tabla Budget
INSERT INTO "Budget" (amount, year, user_id, category_id, month_id) VALUES
(1000, 2024, (SELECT id FROM "User" WHERE username = 'johndoe'), (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'January')),
(200, 2024, (SELECT id FROM "User" WHERE username = 'johndoe'), (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'January')),
(150, 2024, (SELECT id FROM "User" WHERE username = 'johndoe'), (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'January'));

-- Insertar datos en la tabla Movement
INSERT INTO "Movement" (amount, detail, date, user_id, category_id) VALUES
(1000, 'Monthly salary', '2024-01-01', (SELECT id FROM "User" WHERE username = 'johndoe'), (SELECT id FROM "Category" WHERE name = 'Sueldo')),
(-150, 'Weekly groceries', '2024-01-02', (SELECT id FROM "User" WHERE username = 'johndoe'), (SELECT id FROM "Category" WHERE name = 'Comida')),
(-50, 'Bus fare', '2024-01-03', (SELECT id FROM "User" WHERE username = 'johndoe'), (SELECT id FROM "Category" WHERE name = 'Transporte')),
(-50, 'Bus fare', '2024-02-03', (SELECT id FROM "User" WHERE username = 'johndoe'), (SELECT id FROM "Category" WHERE name = 'Transporte'));
