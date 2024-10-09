from flask import Blueprint, jsonify, request
import mysql.connector

registro_bp = Blueprint('registro_bp', __name__)

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

@registro_bp.route('/registro', methods=['POST'])
def registro():
    try:
        datos = request.json
        codigo = datos.get('codigo')
        nombre = datos.get('nombre')
        contraseña = datos.get('contraseña')

        # Verificar que todos los campos requeridos estén presentes y no vacíos
        if not codigo or not nombre or not contraseña:
            return jsonify({'mensaje': 'Todos los campos son obligatorios'}), 400

        conexion = conectar_bd()
        if conexion:
            cursor = conexion.cursor()

            # Verificar si el código existe en la base de datos
            cursor.execute("SELECT * FROM usuario WHERE codigo = %s", (codigo,))
            usuario_existente = cursor.fetchone()

            if not usuario_existente:
                cursor.close()
                conexion.close()
                return jsonify({'mensaje': 'El código no está registrado'}), 400
            
            estado = usuario_existente[4]
            if estado == 0:
                cursor.close()
                conexion.close()
                return jsonify({'mensaje': 'El usuaurio esta deshabilitado, no se puede registrar.' }), 400

            # Insertar el nuevo usuario
            cursor.execute(
                "UPDATE usuario SET nombre = %s, contraseña = %s WHERE codigo = %s",
                (nombre, contraseña, codigo)
            )
            conexion.commit()
            cursor.close()
            conexion.close()
            return jsonify({'mensaje': 'Registro exitoso'}), 200
        else:
            return jsonify({'mensaje': 'Error al conectar a la base de datos'}), 500
    except Exception as e:
        print("Error al registrar usuario:", e)
        return jsonify({'mensaje': 'Error interno del servidor'}), 500
