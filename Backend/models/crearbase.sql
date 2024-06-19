-- Creación de la base de datos siru
CREATE DATABASE IF NOT EXISTS siru;
USE siru;

-- Creación de la tabla usuario
CREATE TABLE IF NOT EXISTS `usuario` (
    `codigo` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
    `nombre` VARCHAR(255) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
    `contraseña` VARCHAR(255) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
    `tipo` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
    PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Inserciones de ejemplo en la tabla usuario
INSERT INTO `usuario` (`codigo`, `nombre`, `contraseña`, `tipo`)
VALUES
('usr1', 'Juan Pérez', 'password1', 'Usuario'),
('usr2', 'María Gómez', 'password2', 'Usuario'),
('usr3', 'Carlos López', 'password3', 'Usuario'),
('admin1', 'Ana Martínez', 'adminpass1', 'Admin'),
('admin2', 'Luis García', 'adminpass2', 'Admin'),
('admin3', 'Eva Hernández', 'adminpass3', 'Admin');

-- Creación de la tabla formularioregistro
CREATE TABLE IF NOT EXISTS `formularioregistro` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
    `titulo` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
    `descripcion` TEXT NOT NULL COLLATE 'latin1_swedish_ci',
    `fecha` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `lugar` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
    `item` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
    `estado` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
    `desarrollo` VARCHAR(255) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
    `encargado` VARCHAR(255) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
    `comentario` VARCHAR(255) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
    `imagen` VARCHAR(255) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
    `codigo_usuario` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_formularioregistro_usuario` FOREIGN KEY (`codigo_usuario`) REFERENCES `usuario` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Inserciones de ejemplo en la tabla formularioregistro
INSERT INTO `formularioregistro` (`codigo`, `titulo`, `descripcion`, `fecha`, `lugar`, `item`, `estado`, `desarrollo`, `encargado`, `comentario`, `imagen`, `codigo_usuario`)
VALUES
('ABC123', 'Reporte 1', 'Descripción del reporte 1', NOW(), 'Lugar 1', 'Item 1', 'Alta', 'En proceso', 'Juan Pérez', 'Comentario 1', 'imagen1.jpg', 'usr1'),
('DEF456', 'Reporte 2', 'Descripción del reporte 2', NOW(), 'Lugar 2', 'Item 2', 'Media', 'Terminado', 'María Gómez', 'Comentario 2', 'imagen2.jpg', 'usr2'),
('GHI789', 'Reporte 3', 'Descripción del reporte 3', NOW(), 'Lugar 3', 'Item 3', 'Baja', 'No verificado', NULL, NULL, NULL, 'usr3'),
('JKL012', 'Reporte 4', 'Descripción del reporte 4', NOW(), 'Lugar 4', 'Item 4', 'Alta', 'Terminado', 'Carlos López', 'Comentario 3', 'imagen3.jpg', 'admin1'),
('MNO345', 'Reporte 5', 'Descripción del reporte 5', NOW(), 'Lugar 5', 'Item 5', 'Media', 'En proceso', 'Ana Martínez', 'Comentario 4', 'imagen4.jpg', 'admin2'),
('PQR678', 'Reporte 6', 'Descripción del reporte 6', NOW(), 'Lugar 6', 'Item 6', 'Baja', 'No verificado', NULL, NULL, NULL, 'admin3');

-- Fin del script
