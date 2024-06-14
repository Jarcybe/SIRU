from flask import Blueprint, jsonify, request
import mysql.connector

registros_bp = Blueprint('registros_bp', __name__)

def conectar_bd():
    try:
        conexion = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="siru"
        )
        return conexion
    except mysql.connector.Error as error:
        print("Error al conectar a la base de datos:", error)
        return None

@registros_bp.route('/obtener_registros', methods=['GET'])
def obtener_registros():
    conexion = conectar_bd()
    if conexion is None:
        return jsonify({"error": "No se pudo conectar a la base de datos"}), 500

    cursor = conexion.cursor(dictionary=True)
    cursor.execute("""
        SELECT fr.*, u.nombre AS nombre_usuario
        FROM formularioregistro fr
        LEFT JOIN usuario u ON fr.codigo = u.codigo
    """)
    registros = cursor.fetchall()
    cursor.close()
    conexion.close()

    return jsonify({"registros": registros})

@registros_bp.route('/obtener_registro/<int:id>', methods=['GET'])
def obtener_registro(id):
    conexion = conectar_bd()
    if conexion is None:
        return jsonify({"error": "No se pudo conectar a la base de datos"}), 500

    cursor = conexion.cursor(dictionary=True)
    cursor.execute("""
        SELECT fr.*, u.nombre AS nombre_usuario
        FROM formularioregistro fr
        LEFT JOIN usuario u ON fr.codigo = u.codigo
        WHERE fr.id = %s
    """, (id,))
    registro = cursor.fetchone()
    cursor.close()
    conexion.close()

    if registro:
        return jsonify({"registro": registro})
    else:
        return jsonify({"error": "Registro no encontrado"}), 404

@registros_bp.route('/actualizar_registro/<int:id>', methods=['PUT'])
def actualizar_registro(id):
    datos = request.json
    encargado = datos.get("encargado")
    comentario = datos.get("comentario")
    desarrollo = datos.get("desarrollo")

    conexion = conectar_bd()
    if conexion is None:
        return jsonify({"error": "No se pudo conectar a la base de datos"}), 500

    cursor = conexion.cursor()
    try:
        cursor.execute("""
            UPDATE formularioregistro
            SET encargado = %s, comentario = %s, desarrollo = %s
            WHERE id = %s
        """, (encargado, comentario, desarrollo, id))
        conexion.commit()
    except mysql.connector.Error as error:
        print("Error al actualizar el registro:", error)
        conexion.rollback()
        cursor.close()
        conexion.close()
        return jsonify({"error": "Error al actualizar el registro"}), 500

    cursor.close()
    conexion.close()
    return jsonify({"mensaje": "Registro actualizado correctamente"})

@registros_bp.route('/eliminar_registro/<int:id>', methods=['DELETE'])
def eliminar_registro(id):
    conexion = conectar_bd()
    if conexion is None:
        return jsonify({"error": "No se pudo conectar a la base de datos"}), 500

    cursor = conexion.cursor()
    try:
        cursor.execute("DELETE FROM formularioregistro WHERE id = %s", (id,))
        conexion.commit()
    except mysql.connector.Error as error:
        print("Error al eliminar el registro:", error)
        conexion.rollback()
        cursor.close()
        conexion.close()
        return jsonify({"error": "Error al eliminar el registro"}), 500

    cursor.close()
    conexion.close()
    return jsonify({"mensaje": "Registro eliminado correctamente"})
