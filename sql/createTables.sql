-- Crear tabla User
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Crear tabla Type
CREATE TABLE "Type" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Crear tabla Category
CREATE TABLE "Category" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    type_id INTEGER NOT NULL REFERENCES "Type"(id)
);

-- Crear tabla Month
CREATE TABLE "Month" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Crear tabla Budget
CREATE TABLE "Budget" (
    id SERIAL PRIMARY KEY,
    amount FLOAT NOT NULL,
    category_id INTEGER NOT NULL REFERENCES "Category"(id),
    month_id INTEGER NOT NULL REFERENCES "Month"(id)
);

-- Crear tabla Movement
CREATE TABLE "Movement" (
    id SERIAL PRIMARY KEY,
    amount FLOAT NOT NULL,
    detail VARCHAR(255),
    date DATE NOT NULL,
    user_id INTEGER NOT NULL REFERENCES "User"(id),
    category_id INTEGER NOT NULL REFERENCES "Category"(id)
);
