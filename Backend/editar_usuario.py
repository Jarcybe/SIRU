from flask import Blueprint, jsonify, request
import mysql.connector

editar_usuario_bp = Blueprint('editar_usuario_bp', __name__)

# Función para conectar a la base de datos
def conectar_bd():
    try:
        conexion = mysql.connector.connect(
            host="localhost",
            user="root",
            password="", 
            database="siru"
        )
        print("Conexión exitosa a la base de datos.")
        return conexion
    except mysql.connector.Error as error:
        print("Error al conectar a la base de datos:", error)
        return None

# Ruta para editar un usuario por código
@editar_usuario_bp.route('/editar_usuario/<string:codigo>', methods=['GET', 'POST'])
def editar_usuario(codigo):
    if request.method == 'GET':
        # Aquí se debería obtener el usuario correspondiente al código de la base de datos
        usuario = obtener_usuario_desde_bd(codigo)
        if usuario:
            return jsonify({'success': True, 'usuario': usuario})
        else:
            return jsonify({'success': False, 'error': 'Usuario no encontrado'}), 404
    elif request.method == 'POST':
        # Aquí se debería actualizar el usuario en la base de datos
        data = request.json
        if actualizar_usuario_en_bd(codigo, data):
            return jsonify({'success': True, 'message': 'Usuario actualizado exitosamente'})
        else:
            return jsonify({'success': False, 'message': 'Error al actualizar usuario'}), 500

# Función para obtener un usuario desde la base de datos por código
def obtener_usuario_desde_bd(codigo):
    conexion = conectar_bd()
    if conexion:
        try:
            cursor = conexion.cursor(dictionary=True)
            cursor.execute("SELECT nombre, contraseña, tipo FROM usuario WHERE codigo = %s", (codigo,))
            usuario = cursor.fetchone()
            cursor.close()
            conexion.close()
            return usuario
        except mysql.connector.Error as error:
            print("Error al obtener usuario desde la base de datos:", error)
            return None
    else:
        return None

# Función para actualizar un usuario en la base de datos por código
def actualizar_usuario_en_bd(codigo, data):
    conexion = conectar_bd()
    if conexion:
        try:
            cursor = conexion.cursor()
            cursor.execute("UPDATE usuario SET nombre = %s, contraseña = %s, tipo = %s WHERE codigo = %s",
                           (data['nombre'], data['contraseña'], data['tipo'], codigo))
            conexion.commit()
            cursor.close()
            conexion.close()
            return True
        except mysql.connector.Error as error:
            print("Error al actualizar usuario en la base de datos:", error)
            return False
    else:
        return False
