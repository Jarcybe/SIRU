from flask import Blueprint, jsonify, request
import mysql.connector

# Definir el blueprint para usuarios
usuarios_bp = Blueprint('usuarios_bp', __name__)

# Función para establecer la conexión a la base de datos MySQL
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

# Endpoint para obtener todos los usuarios o filtrar por algún criterio
@usuarios_bp.route('/obtener_usuarios/<filtro>', methods=['GET'])
def obtener_usuarios(filtro):
    conexion = conectar_bd()
    if conexion is None:
        return jsonify({"error": "No se pudo conectar a la base de datos"}), 500

    cursor = conexion.cursor(dictionary=True)

    if filtro == 'todos':
        cursor.execute("SELECT * FROM usuarios")
    elif filtro == 'Todoslosencargados':
        cursor.execute("SELECT * FROM usuarios WHERE tipo LIKE 'Encargado%'")
    elif filtro in ['Admin', 
                    'Usuario', 
                    'EncargadoGeneral', 'EncargadoElectrico', 
                    'EncargadoFontaneria', 'EncargadoSalones', 
                    'EncargadoInformatico']:
        
        cursor.execute("SELECT * FROM usuarios WHERE tipo = %s", (filtro,))
    else:
        cursor.execute("SELECT * FROM usuarios WHERE correo = %s", (filtro,))
    
    usuarios = cursor.fetchall()
    cursor.close()
    conexion.close()

    return jsonify(usuarios)  

# Endpoint para guardar los cambios realizados en los usuarios
@usuarios_bp.route('/guardar_cambios_usuarios', methods=['POST'])
def guardar_cambios_usuarios():
    try:
        datos = request.json  

        if 'usuarios' not in datos:
            return jsonify({"error": "Datos de usuarios no encontrados"}), 400

        usuarios_actualizados = datos['usuarios']

        # Conectar a la base de datos
        conexion = conectar_bd()
        if conexion is None:
            return jsonify({"error": "No se pudo conectar a la base de datos"}), 500

        cursor = conexion.cursor()
        try:
            for usuario in usuarios_actualizados:
                correo = usuario.get('correo')
                tipo = usuario.get('tipo')
                nombre = usuario.get('nombre')

                # Actualizar el usuario en la base de datos
                cursor.execute("""
                    UPDATE usuarios
                    SET tipo = %s, nombre = %s
                    WHERE correo = %s
                """, (tipo, nombre, correo))

            conexion.commit()
            cursor.close()
            conexion.close()
            return jsonify({"mensaje": "Usuarios actualizados correctamente"}), 200

        except mysql.connector.Error as error:
            print("Error al actualizar usuarios:", error)
            conexion.rollback()
            cursor.close()
            conexion.close()
            return jsonify({"error": "Error al actualizar usuarios"}), 500

    except Exception as e:
        print("Error general al guardar cambios:", e)
        return jsonify({"error": "Error general al guardar cambios"}), 500
