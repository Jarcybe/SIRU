from flask import Blueprint, jsonify, request
import mysql.connector

eliminareusuario = Blueprint('eliminareusuario', __name__)

def obtener_conexion():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="siru"
    )

@eliminareusuario.route('/eliminar_usuario/<correo>', methods=['DELETE'])
def eliminar_usuario(correo):
    connection = obtener_conexion()
    cursor = connection.cursor()

    try:
        cursor.execute("SELECT * FROM usuarios WHERE correo = %s", (correo,))
        usuario = cursor.fetchone()
        if usuario:
            cursor.execute("UPDATE usuarios SET estado = 0 WHERE correo = %s", (correo,))
            connection.commit()
            return jsonify({"message": "Usuario deshabilitdado"}), 200
        else:
            return jsonify({"message": "Usuario no encontrado"}), 404
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error al eliminar el usuario: {err}"}), 500
    finally:
        cursor.close()
        connection.close()

@eliminareusuario.route('/obtener_usuarios/<filtro>', methods=['GET'])
def obtener_usuarios(filtro):
    connection = obtener_conexion()
    cursor = connection.cursor(dictionary=True)

    try:
        if filtro == 'todos':
            cursor.execute("SELECT * FROM usuarios")
        else:
            cursor.execute("SELECT * FROM usuarios WHERE tipo = %s", (filtro,))
        
        usuarios = cursor.fetchall()
        return jsonify(usuarios)
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error al obtener usuarios: {err}"}), 500
    finally:
        cursor.close()
        connection.close()

@eliminareusuario.route('/cambiar_estado/<correo>', methods=['POST'])
def cambiar_estado(correo):
    connection = obtener_conexion()
    cursor = connection.cursor()

    try: 
        cursor.execute("SELECT estado FROM usuarios WHERE correo = %s", (correo,))
        usuario = cursor.fetchone()

        if usuario:
            nuevo_estado = 0 if usuario[0] == 1 else 1
            cursor.execute("UPDATE usuarios SET estado = %s WHERE correo = %s", (nuevo_estado, correo))
            connection.commit()

            estado_texto = "activo" if nuevo_estado == 1 else "inactivo"
            return jsonify({"message": f"Usuario {estado_texto}", "nuevo_estado" : nuevo_estado}), 200
        else:
            return jsonify({"message": "usuario no encontrado"}), 404
    except mysql.connector.Error as err:
        return jsonify({"message": f"error al cambiar al estado del usuario: {err}"}), 500
    finally:
        cursor.close()
        connection.close()

##esto no deberia estar aaqui xd

@eliminareusuario.route('/buscar_usuario/<filtro>', methods=['GET'])
def buscar_usuario(filtro):
    connection = obtener_conexion()
    cursor = connection.cursor(dictionary=True)  # Hacer que las filas sean diccionarios

    try:
        # Consulta que busque por código o nombre (ignorando mayúsculas y minúsculas)
        query = "SELECT * FROM usuarios WHERE LOWER(nombre) LIKE %s"
        like_filter = f"%{filtro.lower()}%"
        cursor.execute(query, (like_filter,))
        usuarios = cursor.fetchall()

        if usuarios:
            return jsonify(usuarios), 200
        else:
            return jsonify([]), 404
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error en la base de datos: {err}"}), 500
    finally:
        cursor.close()
        connection.close()