-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.5.62 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando datos para la tabla siru.formularioregistro: ~2 rows (aproximadamente)
INSERT INTO `formularioregistro` (`id`, `codigo`, `titulo`, `descripcion`, `fecha`, `lugar`, `item`, `estado`, `desarrollo`, `encargado`, `comentario`, `imagen`) VALUES
	(35, '1', 'Informatica1 - Aireacondicionado', 'aaa', '2024-06-14', 'informatica1', 'aireacondicionado', 'baja', 'No verificado', '2222', '2eaaa', 'Backend/uploads\\images.jpeg'),
	(36, 'jarcy1', 'Patio - Asientos', 'se rompio una pata', '2024-06-14', 'patio', 'asientos', 'Alta', NULL, NULL, NULL, 'Backend/uploads/descarga.jpg');

-- Volcando datos para la tabla siru.usuario: ~5 rows (aproximadamente)
INSERT INTO `usuario` (`codigo`, `nombre`, `contraseña`, `tipo`) VALUES
	('1', 'yoseph', '1', 'Usuario'),
	('11', NULL, NULL, 'Usuario'),
	('12', '', 'a', 'Usuario'),
	('123', 'jj', '123', 'Admin'),
	('jarcy1', 'jarcy', 'jarcy', 'Usuario');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
