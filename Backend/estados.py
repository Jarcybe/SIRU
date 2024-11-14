from flask import Blueprint, jsonify, request, session
import mysql.connector

estados_bp = Blueprint('estados_bp', __name__)

# Función para obtener los registros de la base de datos
def obtener_registros(correo):
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="siru"
    )
    cursor = connection.cursor(dictionary=True)

    # Actualizar la consulta para usar la tabla correcta 'reportes'
    query = "SELECT * FROM reportes WHERE fkcorreousuario = %s"
    cursor.execute(query, (correo,))
    registros = cursor.fetchall()

    cursor.close()
    connection.close()
    return registros

# Ruta para obtener los registros de un usuario en las pestaña usuario

@estados_bp.route('/obtener_registros/<correo>', methods=['GET'])
def obtener_registros_route(correo):
    if 'user' not in session or session['user']['correo'] != correo:
        return jsonify([]), 403

    registros = obtener_registros(correo)
    return jsonify(registros)
