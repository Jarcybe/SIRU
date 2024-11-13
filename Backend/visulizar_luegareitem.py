from flask import Blueprint, jsonify, request
import mysql.connector

visulizar_lugar_e_item_bp = Blueprint('visualizar_lugar_e_item', __name__)

# Configurar la conexión a la base de datos MySQL
def conectar_bd():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="siru"
    )

@visulizar_lugar_e_item_bp.route('/obtener_items_por_clase', methods=['POST'])
def obtener_items_por_clase():
    data = request.get_json()
    clase = data['clase']

    try:
        conexion = conectar_bd()
        cursor = conexion.cursor(dictionary=True)

        # Obtener los items dependiendo de la clase seleccionada
        if clase == "todos":
            cursor.execute("SELECT nombreitem, claseitem FROM items")
        else:
            cursor.execute("SELECT nombreitem, claseitem FROM items WHERE claseitem = %s", (clase,))

        items = cursor.fetchall()

        return jsonify({'success': True, 'items': items}), 200

    except Exception as e:
        print("Error al obtener items por clase:", e)
        return jsonify({'success': False, 'message': "Error al obtener los items"}), 500

    finally:
        cursor.close()
        conexion.close()
@visulizar_lugar_e_item_bp.route('/obtener_items_por_lugar_y_clase', methods=['POST'])
def obtener_items_por_lugar_y_clase():
    data = request.get_json()
    fklugar = data['fklugar']
    clase = data.get('clase', 'todos')

    try:
        conexion = conectar_bd()
        cursor = conexion.cursor(dictionary=True)

        # Obtener el nombre del lugar
        cursor.execute("SELECT nombrelugar FROM lugares WHERE idlugar = %s", (fklugar,))
        nombrelugar_result = cursor.fetchone()
        nombrelugar = nombrelugar_result['nombrelugar'] if nombrelugar_result else "Lugar desconocido"

        # Obtener los items asociados al lugar y a la clase especificada
        if clase == "todos":
            query = """
                SELECT i.nombreitem, i.claseitem
                FROM items i
                JOIN lugareitem li ON li.fkitem = i.iditem
                WHERE li.fklugar = %s
            """
            cursor.execute(query, (fklugar,))
        else:
            query = """
                SELECT i.nombreitem, i.claseitem
                FROM items i
                JOIN lugareitem li ON li.fkitem = i.iditem
                WHERE li.fklugar = %s AND i.claseitem = %s
            """
            cursor.execute(query, (fklugar, clase))

        items = cursor.fetchall()

        # Formatear los datos para enviar al frontend
        items_data = [{'nombreitem': item['nombreitem'], 'claseitem': item['claseitem']} for item in items]

        return jsonify({'success': True, 'items': items_data, 'nombrelugar': nombrelugar}), 200

    except Exception as e:
        print("Error al obtener los items:", e)
        return jsonify({'success': False, 'message': "Error al obtener los items del lugar"}), 500

    finally:
        cursor.close()
        conexion.close()