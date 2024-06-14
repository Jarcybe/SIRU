-- Crea la base de datos
siru

-- Usa la base de datos
USE siru;

-- Crea la tabla de usuarios
CREATE TABLE IF NOT EXISTS Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL
);

-- Crea la tabla de formularios de registro
CREATE TABLE IF NOT EXISTS formularioRegistro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(255) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha DATE NOT NULL,
    lugar VARCHAR(255) NOT NULL,
    item VARCHAR(255) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    desarrollo VARCHAR(255) NOT NULL
);

