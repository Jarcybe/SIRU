from flask import Blueprint, jsonify, request
import mysql.connector

editar_items_bp = Blueprint('Editar_Items', __name__)

# Función para conectar a la base de datos
def conectar_bd():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="siru"
    )

@editar_items_bp.route('/eliminar_item', methods=['POST'])
def eliminar_lugar():
    data = request.get_json()
    iditem = data['iditem']

    try:
        conexion = conectar_bd()
        cursor = conexion.cursor()

        # Eliminar las relaciones en lugareitem para el item seleccionado
        cursor.execute("DELETE FROM lugareitem WHERE fkitem = %s", (iditem,))
        
        # Eliminar el item de la tabla principal de lugares
        cursor.execute("DELETE FROM items WHERE iditem = %s", (iditem,))
        conexion.commit()

        return jsonify({'success': True, 'message': 'Item y sus relaciones eliminados correctamente'}), 200

    except Exception as e:
        print("Error al eliminar el lugar y sus relaciones:", e)
        return jsonify({'success': False, 'message': "Error al eliminar el item y sus relaciones"}), 500

    finally:
        cursor.close()
        conexion.close()