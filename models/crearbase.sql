-- Creación de la base de datos siru
CREATE DATABASE IF NOT EXISTS siru;
USE siru;

-- Creación de la tabla usuario
CREATE TABLE IF NOT EXISTS `usuario` (
    `codigo` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
    `nombre` VARCHAR(255) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
    `contraseña` VARCHAR(255) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
    `tipo` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
    'estado' TINYINT(1) NOT NULL DEFAULT '1',
    PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Inserciones de ejemplo en la tabla usuario
INSERT INTO `usuario` (`codigo`, `nombre`, `contraseña`, `tipo`)
VALUES
('2155379', 'Juan Pérez', 'password1', 'Usuario', '1'),
('2266480', 'María Gómez', 'password2', 'Usuario', '1'),
('2377591', 'Eva Hernández', 'adminpass3', 'Admin', '1'),
('123', 'Steven', '3', 'Admin', '1');


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
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_formularioregistro_usuario` FOREIGN KEY (`codigo`) REFERENCES `usuario` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Inserciones de ejemplo en la tabla formularioregistro
INSERT INTO `formularioregistro` (`codigo`, `titulo`, `descripcion`, `fecha`, `lugar`, `item`, `estado`, `desarrollo`, `encargado`, `comentario`, `imagen`)
VALUES
('2155379', 'salon3 - tablero', 'tablero rayado', NOW(), 'salon3', 'tablero', 'Alta', 'En proceso', 'Eva Hernández', 'ya se limpio', 'uploads/imagen1.jpg'),
('2155379', 'salon2 - computador', 'teclado sucio', NOW(), 'salon2', 'computador', 'Media', 'Terminado', 'Eva Hernández', 'ya lo limpiamos', 'uploads/imagen2.jpg'),
('2266480', 'salon6 - ventilador', 'se cayó el ventilador', NOW(), 'salon6', 'ventilador', 'Alta', 'Terminado', 'Eva Hernández', 'ya se puso uno nuevo', 'uploads/imagen3.jpg'),
('2266480', 'informatica1 - aireacondicionado', 'aire acondicionado no enfria', NOW(), 'informatica1', 'aireacondicionado', 'Media', 'En proceso', 'Eva Hernández', 'se mandó al tecnico a comprobar', 'uploads/imagen4.jpg');

-- Fin del script
