from flask import Blueprint, request, jsonify
import mysql.connector

usuarios_actualizar_bp = Blueprint('usuarios_bp', __name__)

def conectar_bd():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="", 
        database="siru"
    )

@usuarios_actualizar_bp.route('/actualizar_usuarios', methods=['POST'])
def actualizar_usuarios():
    try:
        datos = request.get_json()
        usuarios = datos.get('usuarios', [])

        if not usuarios:
            return jsonify({'success': False, 'error': 'No se recibieron datos de usuarios'}), 400

        # Validar que cada usuario tenga los campos necesarios
        for usuario in usuarios:
            if not all(k in usuario for k in ('correo', 'tipo', 'nombre')):
                print(f"Datos de usuario incompletos: {usuario}")
                return jsonify({'success': False, 'error': 'Datos de usuario incompletos'}), 400

        conexion = conectar_bd()
        cursor = conexion.cursor()

        for usuario in usuarios:
            correo = usuario.get('correo')
            tipo = usuario.get('tipo')
            nombre = usuario.get('nombre')

            print(f"Actualizando usuario {correo}: tipo={tipo}, nombre={nombre}")  # Imprimir detalles de cada usuario

            # Actualizar los datos del usuario en la base de datos
            cursor.execute("""
                UPDATE usuarios
                SET tipo = %s, nombre = %s
                WHERE correo = %s
            """, (tipo, nombre, correo))

        conexion.commit()
        print("Actualización de usuarios completada.")  # Confirmar que se completó la actualización
        return jsonify({'success': True, 'message': 'Usuarios actualizados exitosamente'}), 200
    except Exception as e:
        print("Error al actualizar usuarios:", e)  # Imprimir el error para depuración
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        if 'conexion' in locals() and conexion:
            conexion.close()