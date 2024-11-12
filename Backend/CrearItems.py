from flask import Blueprint, jsonify, request
import mysql.connector

crearitems_bp = Blueprint('CrearItems', __name__)

# Función para conectar a la base de datos
def conectar_bd():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="siru"
    )

@crearitems_bp.route('/crear_items', methods=['POST'])
def crear_item():
    data = request.get_json()
    
    nombreitem = data['nombreitem'].strip().lower()
    claseitem = data.get('claseitem', 'sinclase')

    try:
        conexion = conectar_bd()
        cursor = conexion.cursor()

        # Verificar si el nombre ya existe
        cursor.execute("SELECT COUNT(*) FROM items WHERE LOWER(nombreitem) = %s", (nombreitem,))
        if cursor.fetchone()[0] > 0:
            return jsonify(sucess=False, 
                           message="El item ya existe"), 400
        # en caso de que no existe insertar
        cursor.execute("INSERT INTO items (nombreitem, claseitem) VALUES(%s, %s)", 
                       (data['nombreitem'], claseitem))
        conexion.commit()

        return jsonify({'success': True, 'message': 'Item creado correctamente'}), 200

    except Exception as e:
        return jsonify({'success': False, 'message':"Error al guardar en la base de datos"}), 500

    finally:
        cursor.close()
        conexion.close()



@crearitems_bp.route('/obtener_items', methods=['GET'])
def obtener_items():
    try: 

        conexion = conectar_bd()
        cursor = conexion.cursor(dictionary=True)
        cursor.execute("SELECT nombreitem, claseitem FROM items")
        items = cursor.fetchall()

        return jsonify({'items': items}), 200

    except Exception as e:
        return jsonify({'sucess': False,
                        'message': str(e)}), 500
    finally:
        cursor.close()
        conexion.close()


@crearitems_bp.route('/actualizar_clase', methods=['POST'])
def actualizar_clase():
    data = request.get_json()
    cambios = data.get('cambios', [])
    

    try:
        conexion = conectar_bd()
        cursor = conexion.cursor()

        for cambio in cambios:
            nombreitem = cambio.get('nombreitem')
            nuevaclase = cambio.get('claseitem')

            if nombreitem and nuevaclase:
                 cursor.execute("UPDATE items SET claseitem = %s WHERE nombreitem = %s", 
                       (nuevaclase, nombreitem)
                       )
        conexion.commit()

        return jsonify({'success': True, 
                        'message': 'Item actualizado correctamente'}), 200

    except Exception as e:
         return jsonify({'success': False, 'message':"Error al guardar en la base de datos"}), 500
    finally:
        cursor.close()
        conexion.close()

@crearitems_bp.route('/conseguir_items', methods=['GET'])
def get_items():
    try:
        conexion = conectar_bd()
        cursor = conexion.cursor()

        # Obtener iditem y nombreitem
        cursor.execute("SELECT iditem, nombreitem FROM items")
        items = cursor.fetchall()

        # Construir la respuesta JSON con éxito y los ítems
        return jsonify({
            'items': [{'iditem': item[0], 'nombreitem': item[1]} for item in items]
        })

    except Exception as e:
        return jsonify({'success': False, 'message': "item Error al obtener datos de la base de datos"}), 500

    finally:
        cursor.close()
        conexion.close()