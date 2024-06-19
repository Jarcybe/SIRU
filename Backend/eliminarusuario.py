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

@eliminareusuario.route('/eliminar_usuario/<codigo>', methods=['DELETE'])
def eliminar_usuario(codigo):
    connection = obtener_conexion()
    cursor = connection.cursor()

    try:
        cursor.execute("SELECT * FROM usuario WHERE codigo = %s", (codigo,))
        usuario = cursor.fetchone()
        if usuario:
            cursor.execute("DELETE FROM usuario WHERE codigo = %s", (codigo,))
            connection.commit()
            return jsonify({"message": "Usuario eliminado"}), 200
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
            cursor.execute("SELECT * FROM usuario")
        else:
            cursor.execute("SELECT * FROM usuario WHERE tipo = %s", (filtro,))
        
        usuarios = cursor.fetchall()
        return jsonify(usuarios)
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error al obtener usuarios: {err}"}), 500
    finally:
        cursor.close()
        connection.close()
