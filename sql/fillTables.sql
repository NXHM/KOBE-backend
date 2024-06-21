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
('Gasto'),
('Ingreso'),
('Ahorro');

-- Insertar datos en la tabla Category
INSERT INTO "Category" (name, type_id) VALUES
('Sueldo', (SELECT id FROM "Type" WHERE name = 'Ingreso')),
('Predefinido', (SELECT id FROM "Type" WHERE name = 'Ahorro')),
('Transporte', (SELECT id FROM "Type" WHERE name = 'Gasto')),
('Comida', (SELECT id FROM "Type" WHERE name = 'Gasto')),
('Fiestas', (SELECT id FROM "Type" WHERE name = 'Gasto'));

-- Insertar datos en la tabla User
INSERT INTO "User" (name, username, email, password) VALUES
('John Doe', 'johndoe', 'john@example.com', 'password123'),
('Jane Smith', 'janesmith', 'jane@example.com', 'password456');

-- Insertar datos en la tabla Budget
INSERT INTO "Budget" (amount, category_id, month_id) VALUES
(1000, (SELECT id FROM "Category" WHERE name = 'Sueldo'), (SELECT id FROM "Month" WHERE name = 'January')),
(200, (SELECT id FROM "Category" WHERE name = 'Comida'), (SELECT id FROM "Month" WHERE name = 'January')),
(150, (SELECT id FROM "Category" WHERE name = 'Transporte'), (SELECT id FROM "Month" WHERE name = 'January'));

-- Insertar datos en la tabla Movement
INSERT INTO "Movement" (amount, detail, date, user_id, category_id) VALUES
(1000, 'Monthly salary', '2024-01-01', (SELECT id FROM "User" WHERE username = 'johndoe'), (SELECT id FROM "Category" WHERE name = 'Sueldo')),
(-150, 'Weekly groceries', '2024-01-02', (SELECT id FROM "User" WHERE username = 'johndoe'), (SELECT id FROM "Category" WHERE name = 'Comida')),
(-50, 'Bus fare', '2024-01-03', (SELECT id FROM "User" WHERE username = 'johndoe'), (SELECT id FROM "Category" WHERE name = 'Transporte'));
