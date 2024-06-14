from flask import Blueprint, jsonify, request
import mysql.connector

actualizar_reporte_bp = Blueprint('actualizar_reporte', __name__)

# Función para conectar a la base de datos
def conectar_bd():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="siru"
    )

# Ruta para actualizar un registro por su ID
@actualizar_reporte_bp.route('/actualizar_reporte/<int:id>', methods=['PUT'])
def actualizar_reporte(id):
    datos = request.json

    comentario = datos.get('comentario')
    encargado = datos.get('encargado')
    desarrollo = datos.get('desarrollo')

    conexion = None
    try:
        conexion = conectar_bd()
        cursor = conexion.cursor()

        # Consulta para actualizar el registro por su ID
        consulta = "UPDATE FormularioRegistro SET comentario = %s, encargado = %s, desarrollo = %s WHERE id = %s"
        cursor.execute(consulta, (comentario, encargado, desarrollo, id))
        conexion.commit()

        return jsonify({'success': True, 'message': 'Registro actualizado correctamente'}), 200

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

    finally:
        if conexion:
            conexion.close()
