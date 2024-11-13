from flask import Blueprint, jsonify, request
import mysql.connector

editar_lugar_bp = Blueprint('Editar_lugar', __name__)

# Función para conectar a la base de datos
def conectar_bd():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="siru"
    )


@editar_lugar_bp.route('/editar_nombre_lugar', methods=['POST'])
def editar_nombre_lugar():
    data = request.get_json()
    id_lugar = data['id_lugar']
    nuevo_nombre = data['nuevo_nombre']

    try:
        conexion = conectar_bd()
        cursor = conexion.cursor()

        # Verificar si el nuevo nombre ya existe en la base de datos
        cursor.execute("SELECT COUNT(*) FROM lugares WHERE nombrelugar = %s", 
                       (nuevo_nombre,))
        if cursor.fetchone()[0] > 0:
            return jsonify({'success': False, 'message': 'El nombre ya existe, elige otro'}), 400

        # Actualizar el nombre del lugar
        cursor.execute("UPDATE lugares SET nombrelugar = %s WHERE idlugar = %s", 
                       (nuevo_nombre, id_lugar))
        conexion.commit()

        return jsonify({'success': True, 'message': 'Nombre del lugar actualizado correctamente'}), 200

    except Exception as e:
        print("Error al actualizar el nombre del lugar:", e)
        return jsonify({'success': False, 'message': "Error al actualizar el nombre en la base de datos"}), 500

    finally:
        cursor.close()
        conexion.close()


@editar_lugar_bp.route('/eliminar_item_lugar', methods=['POST'])
def eliminar_item_lugar():
    data = request.get_json()
    fklugar = data['fklugar']
    fkitem = data['fkitem']

    try:
        conexion = conectar_bd()
        cursor = conexion.cursor()

        # Eliminar la relación entre el lugar y el item
        cursor.execute("DELETE FROM lugareitem WHERE fklugar = %s AND fkitem = %s", (fklugar, fkitem))
        conexion.commit()

        return jsonify({'success': True, 'message': 'Item eliminado del lugar correctamente'}), 200

    except Exception as e:
        print("Error al eliminar la relación del item:", e)
        return jsonify({'success': False, 'message': "Error al eliminar el item del lugar"}), 500

    finally:
        cursor.close()
        conexion.close()

@editar_lugar_bp.route('/obtener_items_por_lugar', methods=['POST'])
def obtener_items_por_lugar():
    data = request.get_json()
    fklugar = data['fklugar']

    try:
        conexion = conectar_bd()
        cursor = conexion.cursor()

        # Obtener los items asociados al lugar
        cursor.execute("""
            SELECT i.iditem, i.nombreitem
            FROM items i
            JOIN lugareitem li ON li.fkitem = i.iditem
            WHERE li.fklugar = %s
        """, (fklugar,))
        items = cursor.fetchall()

        items_data = [{'iditem': item[0], 'nombreitem': item[1]} for item in items]

        return jsonify({'success': True, 'items': items_data}), 200

    except Exception as e:
        print("Error al obtener los items:", e)
        return jsonify({'success': False, 'message': "Error al obtener los items del lugar"}), 500

    finally:
        cursor.close()
        conexion.close()


@editar_lugar_bp.route('/eliminar_lugar', methods=['POST'])
def eliminar_lugar():
    data = request.get_json()
    idlugar = data['idlugar']

    try:
        conexion = conectar_bd()
        cursor = conexion.cursor()

        # Eliminar las relaciones en lugareitem para el lugar seleccionado
        cursor.execute("DELETE FROM lugareitem WHERE fklugar = %s", (idlugar,))
        
        # Eliminar el lugar de la tabla principal de lugares
        cursor.execute("DELETE FROM lugares WHERE idlugar = %s", (idlugar,))
        conexion.commit()

        return jsonify({'success': True, 'message': 'Lugar y sus relaciones eliminados correctamente'}), 200

    except Exception as e:
        print("Error al eliminar el lugar y sus relaciones:", e)
        return jsonify({'success': False, 'message': "Error al eliminar el lugar y sus relaciones"}), 500

    finally:
        cursor.close()
        conexion.close()