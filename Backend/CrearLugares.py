from flask import Blueprint, jsonify, request
import mysql.connector

crearlugares_bp = Blueprint('CrearLugares', __name__)

# Función para conectar a la base de datos
def conectar_bd():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="siru"
    )

@crearlugares_bp.route('/crear_lugar', methods=['POST'])
def crear_lugar():
    data = request.get_json()
    nombrelugar = data['nombrelugar'].strip().lower()

    try:
        conexion = conectar_bd()
        cursor = conexion.cursor()

        # Verificar si el nombre ya existe
        cursor.execute("SELECT COUNT(*) FROM lugares WHERE LOWER(nombrelugar) = %s", (nombrelugar,))
        if cursor.fetchone()[0] > 0:
            return jsonify(sucess=False, 
                           message="El lugar ya existe"), 400
        # en caso de que no existe insertar
        cursor.execute("INSERT INTO lugares (nombrelugar) VALUES(%s)", 
                       (data['nombrelugar'],))
        conexion.commit()

        return jsonify({'success': True, 'message': 'Lugar creado correctamente'}), 200

    except Exception as e:
        return jsonify({'success': False, 'message':"Error al guardar en la base de datos"}), 500

    finally:
        cursor.close()
        conexion.close()
    
@crearlugares_bp.route('/conseguir_lugares', methods=['GET'])
def get_lugares():
    try:
        conexion = conectar_bd()
        cursor = conexion.cursor()

        # Obtener todos los lugares
        cursor.execute("SELECT idlugar, nombrelugar FROM lugares")
        lugares = cursor.fetchall()

        # Obtener todos los items

        return jsonify({
            'lugares': [{'idlugar': lugar[0], 'nombrelugar': lugar[1]} for lugar in lugares],
        })

    except Exception as e:
        return jsonify({'success': False, 'message': 'Error al obtener los datos'}), 500

    finally:
        cursor.close()
        conexion.close()

@crearlugares_bp.route('/asociar_item', methods=['POST'])
def asociar_item():
    data = request.get_json()
    print("Datos recibidos:", data)  # Depuración: verifica los datos que llegan al servidor
    fklugar = data['fklugar']
    fkitem = data['fkitem']

    try:
        conexion = conectar_bd()
        cursor = conexion.cursor()

        # Verificar si la relación ya existe
        cursor.execute("SELECT COUNT(*) FROM lugareitem WHERE fklugar = %s AND fkitem = %s", (fklugar, fkitem))
        if cursor.fetchone()[0] > 0:
            return jsonify({'success': False, 'message': 'La relación entre el lugar y el item ya existe'}), 400

        # Insertar la nueva relación
        cursor.execute("INSERT INTO lugareitem (fklugar, fkitem) VALUES (%s, %s)", (fklugar, fkitem))
        conexion.commit()

        return jsonify({'success': True, 'message': 'Item añadido al lugar correctamente'}), 200

    except Exception as e:
        print("Error al guardar la relación en la base de datos:", e)  # Depuración: imprime el error específico
        return jsonify({'success': False, 'message': "Error al guardar la relación en la base de datos"}), 500

    finally:
        cursor.close()
        conexion.close()


@crearlugares_bp.route('/copiar_items', methods=['POST'])
def copiar_items():
    data = request.get_json()
    fklugar_destino = data['fklugar_destino']
    fklugar_origen = data['fklugar_origen']

    try:
        conexion = conectar_bd()
        cursor = conexion.cursor()

        # Obtener los items del lugar de origen
        cursor.execute("SELECT fkitem FROM lugareitem WHERE fklugar = %s", (fklugar_origen,))
        items_origen = set(item[0] for item in cursor.fetchall())

        # Obtener los items ya existentes en el lugar de destino
        cursor.execute("SELECT fkitem FROM lugareitem WHERE fklugar = %s", (fklugar_destino,))
        items_destino = set(item[0] for item in cursor.fetchall())

        # Filtrar los items que no estén ya en el destino
        items_a_copiar = items_origen - items_destino

        if not items_a_copiar:
            return jsonify({'success': False, 'message': 'No hay nuevos items para copiar.'}), 400

        # Insertar los items faltantes en el lugar destino
        for fkitem in items_a_copiar:
            cursor.execute("INSERT INTO lugareitem (fklugar, fkitem) VALUES (%s, %s)", (fklugar_destino, fkitem))

        conexion.commit()
        return jsonify({'success': True, 'message': 'Items copiados correctamente'}), 200

    except Exception as e:
        print("Error al copiar items en la base de datos:", e)
        return jsonify({'success': False, 'message': "Error al copiar los items"}), 500

    finally:
        cursor.close()
        conexion.close()