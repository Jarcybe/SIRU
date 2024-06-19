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
CREATE TABLE `formularioregistro` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`codigo` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
	`titulo` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
	`descripcion` TEXT NOT NULL COLLATE 'latin1_swedish_ci',
	`fecha` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	`lugar` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
	`item` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
	`estado` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`desarrollo` VARCHAR(255) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`encargado` VARCHAR(255) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`comentario` VARCHAR(255) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`imagen` VARCHAR(255) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK_formularioregistro_usuario` (`codigo`) USING BTREE,
	CONSTRAINT `FK_formularioregistro_usuario` FOREIGN KEY (`codigo`) REFERENCES `usuario` (`codigo`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=16
;
-- Inserciones de ejemplo en la tabla formularioregistro

-- Fin del script
