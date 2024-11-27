-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para siru
CREATE DATABASE IF NOT EXISTS `siru` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `siru`;

-- Volcando estructura para tabla siru.desarrollo
CREATE TABLE IF NOT EXISTS `desarrollo` (
  `iddesarrollo` bigint(20) NOT NULL AUTO_INCREMENT,
  `fkreporte` bigint(20) NOT NULL,
  `fkcorreoencargado` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nombreencargado` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `comentario` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`iddesarrollo`),
  KEY `FK_desarrollo_reportes` (`fkreporte`),
  KEY `FK_desarrollo_usuarios` (`fkcorreoencargado`),
  CONSTRAINT `FK_desarrollo_reportes` FOREIGN KEY (`fkreporte`) REFERENCES `reportes` (`idreporte`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_desarrollo_usuarios` FOREIGN KEY (`fkcorreoencargado`) REFERENCES `usuarios` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla siru.desarrollo: ~4 rows (aproximadamente)
INSERT INTO `desarrollo` (`iddesarrollo`, `fkreporte`, `fkcorreoencargado`, `nombreencargado`, `comentario`, `fecha`) VALUES
	(31, 25, 'yoseph.aguilar@correounivalle.edu.co', 'Yosephsito', 'ya esta atento', '2024-11-26 02:58:53'),
	(32, 25, 'yoseph.aguilar@correounivalle.edu.co', 'Yosephsito', 'Se notificó lo siguiente al admin - no tenemos elementos para arreglar el espejo', '2024-11-26 03:00:03'),
	(33, 64, 'yoseph.aguilar@correounivalle.edu.co', 'Yosephsito', 'Aun nose que poner aqui pero bueno', '2024-11-27 03:59:13'),
	(34, 64, 'yoseph.aguilar@correounivalle.edu.co', 'Yosephsito', 'ya se acabo', '2024-11-27 03:59:29');

-- Volcando estructura para tabla siru.items
CREATE TABLE IF NOT EXISTS `items` (
  `iditem` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombreitem` varchar(50) NOT NULL,
  `claseitem` varchar(50) NOT NULL,
  PRIMARY KEY (`iditem`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla siru.items: ~16 rows (aproximadamente)
INSERT INTO `items` (`iditem`, `nombreitem`, `claseitem`) VALUES
	(1, 'bombillas', 'electricos'),
	(2, 'Computadores', 'informaticos'),
	(4, 'mesas', 'generales'),
	(5, 'Pisos', 'generales'),
	(6, 'sillas', 'generales'),
	(23, 'Enchufes', 'electricos'),
	(24, 'Lavamanos', 'baños'),
	(25, 'Urinarios', 'baños'),
	(26, 'Tablero', 'salones'),
	(27, 'Espejos', 'generales'),
	(29, 'Inodoros', 'baños'),
	(32, 'MaquinaExpendedora', 'generales'),
	(33, 'Tazas', 'baños'),
	(34, 'Mouse', 'informaticos'),
	(35, 'Teclado', 'informaticos'),
	(36, 'Ventiladores', 'electricos'),
	(37, 'AireAcondicionado', 'electricos'),
	(38, 'escritorio', 'generales');

-- Volcando estructura para tabla siru.lugareitem
CREATE TABLE IF NOT EXISTS `lugareitem` (
  `numerounico` bigint(20) NOT NULL AUTO_INCREMENT,
  `fklugar` bigint(20) NOT NULL,
  `fkitem` bigint(20) NOT NULL,
  PRIMARY KEY (`numerounico`),
  KEY `FK_lugareitem_items` (`fkitem`),
  KEY `FK_lugareitem_lugares` (`fklugar`),
  CONSTRAINT `FK_lugareitem_items` FOREIGN KEY (`fkitem`) REFERENCES `items` (`iditem`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_lugareitem_lugares` FOREIGN KEY (`fklugar`) REFERENCES `lugares` (`idlugar`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla siru.lugareitem: ~27 rows (aproximadamente)
INSERT INTO `lugareitem` (`numerounico`, `fklugar`, `fkitem`) VALUES
	(22, 3, 1),
	(23, 3, 2),
	(25, 6, 5),
	(32, 4, 1),
	(33, 4, 2),
	(35, 4, 4),
	(36, 19, 2),
	(37, 19, 4),
	(38, 5, 4),
	(43, 3, 5),
	(45, 6, 6),
	(50, 41, 33),
	(51, 5, 1),
	(52, 5, 2),
	(53, 5, 5),
	(54, 2, 24),
	(55, 12, 29),
	(56, 2, 27),
	(57, 2, 5),
	(58, 7, 35),
	(59, 7, 23),
	(60, 7, 37),
	(61, 7, 2),
	(62, 8, 2),
	(63, 8, 35),
	(64, 8, 37),
	(65, 8, 23);

-- Volcando estructura para tabla siru.lugares
CREATE TABLE IF NOT EXISTS `lugares` (
  `idlugar` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombrelugar` varchar(50) NOT NULL,
  PRIMARY KEY (`idlugar`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla siru.lugares: ~14 rows (aproximadamente)
INSERT INTO `lugares` (`idlugar`, `nombrelugar`) VALUES
	(2, 'Baños para mujeres segundo piso'),
	(3, 'Salon1'),
	(4, 'Salon2'),
	(5, 'Salon3'),
	(6, 'Salon4'),
	(7, 'Informatica1'),
	(8, 'Informatica2'),
	(9, 'Patios'),
	(10, 'Informatica3'),
	(12, 'Baños para mujeres primer piso'),
	(16, 'patios2'),
	(18, 'Salon15'),
	(19, 'cafeteria'),
	(41, 'Salon Conferencia');

-- Volcando estructura para tabla siru.notificaciones
CREATE TABLE IF NOT EXISTS `notificaciones` (
  `idnotificacion` bigint(20) NOT NULL AUTO_INCREMENT,
  `fkcorreousuario` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nombreautor` varchar(255) NOT NULL,
  `fecha` varchar(50) NOT NULL,
  `enunciado` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `vistonovisto` tinyint(1) NOT NULL DEFAULT 0,
  `remitente` varchar(50) CHARACTER SET latin1 COLLATE latin1_nopad_bin NOT NULL,
  PRIMARY KEY (`idnotificacion`) USING BTREE,
  KEY `FK_notificaciones_usuarios` (`fkcorreousuario`),
  CONSTRAINT `FK_notificaciones_usuarios` FOREIGN KEY (`fkcorreousuario`) REFERENCES `usuarios` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla siru.notificaciones: ~6 rows (aproximadamente)
INSERT INTO `notificaciones` (`idnotificacion`, `fkcorreousuario`, `nombreautor`, `fecha`, `enunciado`, `vistonovisto`, `remitente`) VALUES
	(9, '123', 'maria', '2024-11-21 11:41:56', 'esto no deberai salir', 0, '123'),
	(28, 'yoseph.aguilar@correounivalle.edu.co', 'Yosephsito', '2024-11-25 21:56:34', 'necesita atencion cierto', 0, 'admin1'),
	(29, 'yoseph.aguilar@correounivalle.edu.co', 'Yosephsito', '2024-11-25 21:58:53', 'Tu reporte BañosM1 - Espejos ya fue visto y ya empezó un desarrollo', 0, 'usr2'),
	(30, 'yoseph.aguilar@correounivalle.edu.co', 'Yosephsito', '2024-11-25 22:00:03', 'no tenemos elementos para arreglar el espejo', 0, 'admin2'),
	(31, 'yoseph.aguilar@correounivalle.edu.co', 'Yosephsito', '2024-11-26 22:59:13', 'Tu reporte Salon1 - Bombillas ya fue visto y ya empezó un desarrollo', 1, 'yoseph.aguilar@correounivalle.edu.co'),
	(32, 'yoseph.aguilar@correounivalle.edu.co', 'Yosephsito', '2024-11-26 22:59:29', 'Tu reporte Salon1 - Bombillas ya ha sido revisado y ha terminado su desarrollo', 0, 'yoseph.aguilar@correounivalle.edu.co');

-- Volcando estructura para tabla siru.reportes
CREATE TABLE IF NOT EXISTS `reportes` (
  `idreporte` bigint(20) NOT NULL AUTO_INCREMENT,
  `fkcorreousuario` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha` varchar(50) DEFAULT NULL,
  `lugar` varchar(255) NOT NULL,
  `item` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `fkdesarrollo` bigint(20) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idreporte`),
  KEY `FK_reportes_usuarios` (`fkcorreousuario`),
  KEY `FK_reportes_desarrollo` (`fkdesarrollo`),
  CONSTRAINT `FK_reportes_desarrollo` FOREIGN KEY (`fkdesarrollo`) REFERENCES `desarrollo` (`iddesarrollo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_reportes_usuarios` FOREIGN KEY (`fkcorreousuario`) REFERENCES `usuarios` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Volcando datos para la tabla siru.reportes: ~14 rows (aproximadamente)
INSERT INTO `reportes` (`idreporte`, `fkcorreousuario`, `titulo`, `descripcion`, `fecha`, `lugar`, `item`, `tipo`, `fkdesarrollo`, `imagen`, `estado`) VALUES
	(1, '1', 'BañosH1 - Urinarios', 'sdsd', '2024-11-15 11:03:03', 'bañosH1', 'urinarios', 'Reparación', NULL, NULL, 'No visto'),
	(10, '1', 'Salon3 - Enchufes', 'mucha texto', '2024-11-14 00:20:58', 'salon3', 'enchufes', '', NULL, NULL, 'No verificado'),
	(14, 'usr1', 'BañosM1 - Lavamanos', 'knewiifnifiwnf', '2024-11-15 11:03:18', 'bañosM1', 'lavamanos', 'Sugerencia', NULL, NULL, 'No visto'),
	(18, '1', 'BañosM1 - Lavamanos', 'a', '2024-11-14 00:21:17', 'bañosM1', 'lavamanos', '', NULL, NULL, 'No visto'),
	(20, '1', 'BañosH1 - Urinarios', 'jnn', '2024-11-14 00:21:16', 'bañosH1', 'urinarios', '', NULL, NULL, 'No visto'),
	(25, 'usr2', 'BañosM1 - Espejos', 'xxc', '2024-11-18 13:14:06', 'bañosM1', 'espejos', 'Reparación', 31, NULL, 'En proceso'),
	(26, 'usr2', 'BañosH1 - Espejos', 'xvcxvx', '2024-11-14 00:21:21', 'bañosH1', 'espejos', '', NULL, NULL, 'No visto'),
	(27, '1', 'Biblioteca - Sillas', 'dfc dfecf', '2024-11-14 00:21:22', 'biblioteca', 'sillas', '', NULL, NULL, 'No visto'),
	(28, '1', 'BañosM2 - Tazas', 'a', '2024-11-14 00:21:23', 'bañosM2', 'tazas', '', NULL, NULL, 'No visto'),
	(32, '1', 'Informatica2 - Bombillo', 'dv', '2024-11-14 00:21:24', 'informatica2', 'bombillo', '', NULL, NULL, 'No visto'),
	(34, '1', 'Salon1 - Aireacondicionado', 's', '2024-11-14 00:21:25', 'salon1', 'aireacondicionado', '', NULL, NULL, 'No visto'),
	(37, '1', 'Salon4 - Pupitres', 'efefvefv fv', '2024-11-14 00:21:27', 'salon4', 'pupitres', '', NULL, NULL, 'No visto'),
	(45, '123', 'Informatica2 - Bombillo', 'Mi primer reporte', '2024-11-14 00:21:29', 'informatica2', 'bombillo', '', NULL, NULL, 'No visto'),
	(64, 'yoseph.aguilar@correounivalle.edu.co', 'Salon1 - Bombillas', 'descricion', '2024-11-26 22:45:32', 'Salon1', 'bombillas', 'Reparacion', 34, NULL, 'Terminado');

-- Volcando estructura para tabla siru.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `correo` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Volcando datos para la tabla siru.usuarios: ~16 rows (aproximadamente)
INSERT INTO `usuarios` (`correo`, `nombre`, `password`, `tipo`, `estado`) VALUES
	('1', 'jose', '123', 'Usuario', 1),
	('123', '12345', 'A12345678', 'EncargadoGeneral', 0),
	('1234', 'fontanero', '1', 'EncargadoFontaneria', 1),
	('2', '1', 'A1234567', 'EncargadoElectrico', 1),
	('234', '', '', 'EncargadoSalones', 1),
	('88', 'null', '', 'EncargadoInformatico', 1),
	('Admin', 'Perez', '1b18033d8286c4efc126b8a131e85db079c731aca276c9204b6221ca00fedbb0', 'Admin', 1),
	('admin1', 'Ana Martínez', '1', 'Admin', 1),
	('admin2', 'Luis García', 'adminpass2', 'Admin', 0),
	('admin3', 'Eva c', 'adminpass3', '', 0),
	('Encargado', 'Liam', '1b18033d8286c4efc126b8a131e85db079c731aca276c9204b6221ca00fedbb0', 'EncargadoGeneral', 1),
	('usr1', 'Juan Pérez', 'password1', 'Usuario', 1),
	('usr2', 'María Gómez', 'password2', 'Usuario', 1),
	('usr3', '1', '1', 'Usuario', 1),
	('Usuario', 'Juan', '1b18033d8286c4efc126b8a131e85db079c731aca276c9204b6221ca00fedbb0', 'Usuario', 1),
	('yoseph.aguilar@correounivalle.edu.co', 'Yosephsito', '1b18033d8286c4efc126b8a131e85db079c731aca276c9204b6221ca00fedbb0', 'Admin', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
