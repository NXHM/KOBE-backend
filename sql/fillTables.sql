/* Insert de tipos de movimientos */
INSERT INTO "Type" (name)
VALUES ('Ingreso'), ('Gasto'), ('Ahorro');

/* Insert de usuarios */
INSERT INTO "User" (name, username, email, password) 
VALUES ('José Valdivia', 'Pepe', 'pepe@ulima.edu.pe', 'pepe12345');

/* Insert de los años */
INSERT INTO "Year" (name)
VALUES (2021), (2022), (2023), (2024), (2025), (2026);

/* Insert de los meses */
INSERT INTO "Month" (name, days)
VALUES 
('Enero', 31), ('Febrero', 28), ('Marzo', 31), ('Abril', 30), ('Mayo', 31), ('Junio', 30),
('Julio', 31), ('Agosto', 31), ('Setiembre', 30), ('Octubre', 31), ('Noviembre', 30), ('Diciembre', 31);

/* Insert de categorías por tipo (las por defecto) */
INSERT INTO "Category" (name, type_id)
VALUES ('Sueldo', 1), ('Comida', 2), ('Transporte', 2), ('Nueva Casa', 3);

/* Inserts de los Budgets */
INSERT INTO "Budget" (amount, category_id, user_id, month_id, year_id)
VALUES 
    (1025.0, 1, 1, 1, 1), 
    (350.0, 2, 1, 1, 1), 
    (150.0, 3, 1, 1, 1),
    (200.0, 4, 1, 1, 1);

/* Inserts de Días dentro de calendario */
INSERT INTO "Calendar" (date, month_id, year_id)
VALUES 
    (CURRENT_DATE, 1, 1),
    (CURRENT_DATE + interval '1 day', 1, 1),
    (CURRENT_DATE + interval '2 days', 1, 1),
    (CURRENT_DATE + interval '3 days', 1, 1),
    (CURRENT_DATE + interval '4 days', 1, 1),
    (CURRENT_DATE + interval '5 days', 2, 1);

/* Insert de los movimientos */
INSERT INTO "Movement" (amount, detail, date_id, user_id, category_id) 
VALUES 
    (500, 'quincena', 1, 1, 1),
    (500, 'quincena', 6, 1, 1),
    (40, 'almuerzo', 2, 1, 2),
    (20, 'menu', 3, 1, 2),
    (30, 'taxi', 2, 1, 3),
    (19.8, 'taxi', 4, 1, 3),
    (100, '', 1, 1, 4),
    (20, '', 5, 1, 4);


