from flask import Blueprint, jsonify, request
import mysql.connector

buscar_reportes_bp = Blueprint('buscar_reportes_bp', __name__)


def conectar_bd():
    try:
        conexion = mysql.connector.connect(
            host="localhost",
            user="root",
            password="", 
            database="siru"
        )
        return conexion
    except mysql.connector.Error as error:
        print("Error al conectar a la base de datos:", error)
        return None

# Manejar las solicitudes GET en la ruta "/buscar_reportes"
@buscar_reportes_bp.route('/buscar_reportes', methods=['GET'])
def buscar_reportes():
    try:
        # Obtener los parámetros de búsqueda del cuerpo de la solicitud
        codigo_usuario = request.args.get('codigo_usuario')
        lugar = request.args.get('lugar', '').lower()
        item = request.args.get('item', '').lower()
        estado = request.args.get('estado', '')
        desarrollo = request.args.get('desarrollo', '')
        reciente = request.args.get('reciente', '')
        orden = request.args.get('orden', '')

        # Validar que el código de usuario esté presente
        if not codigo_usuario:
            return jsonify({'success': False, 'error': 'Código de usuario requerido'}), 400

        conexion = conectar_bd()
        if conexion is None:
            return jsonify({"error": "No se pudo conectar a la base de datos"}), 500

        cursor = conexion.cursor(dictionary=True)

        # Construir la consulta SQL basada en los parámetros de búsqueda
        consulta = """
            SELECT *
            FROM FormularioRegistro
            WHERE codigo = %s
        """
        parametros = [codigo_usuario]

        if lugar:
            consulta += " AND LOWER(lugar) LIKE %s"
            parametros.append(f"%{lugar}%")
        if item:
            consulta += " AND LOWER(item) LIKE %s"
            parametros.append(f"%{item}%")
        if estado:
            consulta += " AND estado = %s"
            parametros.append(estado)
        if desarrollo:
            consulta += " AND LOWER(desarrollo) = %s"
            parametros.append(desarrollo.lower())
        if reciente:
            if reciente == "Ninguna":
                consulta += " AND (comentario IS NULL OR encargado IS NULL)"
            elif reciente == "Comentario":
                consulta += " AND comentario IS NOT NULL"
            elif reciente == "Encargado":
                consulta += " AND encargado IS NOT NULL"
            elif reciente == "Ambas":
                consulta += " AND comentario IS NOT NULL AND encargado IS NOT NULL"

        if orden == "Reciente":
            consulta += " ORDER BY fecha DESC"
        elif orden == "Antiguo":
            consulta += " ORDER BY fecha ASC"

        # Ejecutar la consulta SQL en la base de datos
        cursor.execute(consulta, tuple(parametros))
        registros = cursor.fetchall()
        cursor.close()
        conexion.close()

        return jsonify({'success': True, 'registros': registros})

    except mysql.connector.Error as error:
        return jsonify({'success': False, 'error': str(error)}), 500

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
