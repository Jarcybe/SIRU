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
        correo_usuario = request.args.get('correo_usuario')
        lugar = request.args.get('lugar', '').lower()
        item = request.args.get('item', '').lower()
        tipo = request.args.get('tipo', '')
        estado = request.args.get('estado', '')
        retroalimentacion = request.args.get('retroalimentacion', '')
        orden = request.args.get('orden', '')

        # Validar que el correo de usuario esté presente
        if not correo_usuario:
            return jsonify({'success': False, 'error': 'correo de usuario requerido'}), 400

        conexion = conectar_bd()
        if conexion is None:
            return jsonify({"error": "No se pudo conectar a la base de datos"}), 500

        cursor = conexion.cursor(dictionary=True)

        # Construir la consulta SQL basada en los parámetros de búsqueda
        consulta = """
            SELECT *
            FROM reportes
            WHERE fkcorreousuario = %s
        """
        parametros = [correo_usuario]

        if lugar:
            consulta += " AND LOWER(lugar) LIKE %s"
            parametros.append(f"%{lugar}%")
        if item:
            consulta += " AND LOWER(item) LIKE %s"
            parametros.append(f"%{item}%")
        if tipo:
            consulta += " AND tipo = %s"
            parametros.append(tipo)
        if estado:
           consulta += " AND LOWER(estado) = %s"
           parametros.append(estado.lower())
        if retroalimentacion:
            if retroalimentacion == "Ninguna":
               consulta += " AND fkdesarrollo IS NULL"
            elif retroalimentacion == "Tener":
               consulta += " AND fkdesarrollo IS NOT NULL"

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

##Filtrar reprotes para admin
@buscar_reportes_bp.route('/filtrar_registros', methods=['GET'])
def filtrar_registros():
    try:
        # Obtener los parámetros de búsqueda de la solicitud
        nombre = request.args.get('nombre_usuario', '').lower()
        lugar = request.args.get('lugar', '').lower()
        item = request.args.get('item', '').lower()
        tipo = request.args.get('tipo', '')
        estado = request.args.get('estado', '')
        sin_imagen = request.args.get('sinImagen', 'false') == 'true'
        orden = request.args.get('orden', '')

        conexion = conectar_bd()
        if conexion is None:
            return jsonify({"error": "No se pudo conectar a la base de datos"}), 500

        cursor = conexion.cursor(dictionary=True)

        # Construir la consulta SQL basada en los parámetros de búsqueda
        consulta = """
            SELECT r.*, u.nombre AS nombre_usuario
            FROM reportes r
            LEFT JOIN usuarios u ON r.fkcorreousuario = u.correo
            WHERE 1=1
        """
        parametros = []

        if nombre:
            consulta += " AND LOWER(nombre) LIKE %s"
            parametros.append(f"%{nombre}%")
        if lugar:
            consulta += " AND LOWER(lugar) LIKE %s"
            parametros.append(f"%{lugar}%")
        if item:
            consulta += " AND LOWER(item) LIKE %s"
            parametros.append(f"%{item}%")
        if tipo:
            consulta += " AND tipo = %s"
            parametros.append(tipo)
        if estado:
           consulta += " AND LOWER(estado) = %s"
           parametros.append(estado.lower())
        if sin_imagen:
            consulta += " AND (imagen IS NULL OR imagen = '')"

        # Ordenar por fecha
        if orden == "Reciente":
            consulta += " ORDER BY fecha DESC"
        elif orden == "Antiguo":
            consulta += " ORDER BY fecha ASC"

        # Ejecutar la consulta
        cursor.execute(consulta, tuple(parametros))
        registros = cursor.fetchall()

        cursor.close()
        conexion.close()

        return jsonify({'success': True, 'registros': registros})

    except mysql.connector.Error as error:
        return jsonify({'success': False, 'error': str(error)}), 500

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500