from flask import Blueprint, jsonify
import mysql.connector

eliminar_registro_bp = Blueprint('eliminar_registro', __name__)

# Función para conectar a la base de datos
def conectar_bd():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="siru"
    )

# Ruta para eliminar un registro por su ID
@eliminar_registro_bp.route('/eliminar_registro/<int:id>', methods=['DELETE'])
def eliminar_registro(id):
   

    conexion = None
    try:
        conexion = conectar_bd()
        cursor = conexion.cursor()

        # Consulta para eliminar el registro por su ID
        cursor.execute("DELETE FROM FormularioRegistro WHERE id = %s", (id,))
        conexion.commit()

        return jsonify({'success': True, 'message': 'Registro eliminado correctamente'}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        if conexion:
            conexion.close()
