from flask import Blueprint, jsonify, request, session
import mysql.connector

estados_bp = Blueprint('estados_bp', __name__)

# Función para obtener los registros de la base de datos
def obtener_registros(codigo):
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="siru"
    )
    cursor = connection.cursor(dictionary=True)

    # Actualizar la consulta para usar la tabla correcta 'formularioregistro'
    query = "SELECT * FROM formularioregistro WHERE codigo = %s"
    cursor.execute(query, (codigo,))
    registros = cursor.fetchall()

    cursor.close()
    connection.close()
    return registros

# Ruta para obtener los registros de un usuario
@estados_bp.route('/obtener_registros/<codigo>', methods=['GET'])
def obtener_registros_route(codigo):
    if 'user' not in session or session['user']['codigo'] != codigo:
        return jsonify([]), 403

    registros = obtener_registros(codigo)
    return jsonify(registros)
