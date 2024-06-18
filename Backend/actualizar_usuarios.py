from flask import Flask, Blueprint, request, jsonify
import mysql.connector

app = Flask(__name__)

usuarios_bp = Blueprint('usuarios_bp', __name__)

def conectar_bd():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",  # Ajusta según sea necesario
        database="siru"
    )

@usuarios_bp.route('/actualizar_usuarios', methods=['POST'])
def actualizar_usuarios():
    try:
        datos = request.get_json()
        usuarios = datos.get('usuarios', [])

        print("Usuarios recibidos:", usuarios)  # Imprimir los datos recibidos para depuración

        if not usuarios:
            return jsonify({'success': False, 'error': 'No se recibieron datos de usuarios'}), 400

        # Validar que cada usuario tenga los campos necesarios
        for usuario in usuarios:
            if not all(k in usuario for k in ('codigo', 'tipo', 'nombre', 'contraseña')):
                print(f"Datos de usuario incompletos: {usuario}")
                return jsonify({'success': False, 'error': 'Datos de usuario incompletos'}), 400

        conexion = conectar_bd()
        cursor = conexion.cursor()

        for usuario in usuarios:
            codigo = usuario.get('codigo')
            tipo = usuario.get('tipo')
            nombre = usuario.get('nombre')
            contraseña = usuario.get('contraseña')

            print(f"Actualizando usuario {codigo}: tipo={tipo}, nombre={nombre}, contraseña={contraseña}")  # Imprimir detalles de cada usuario

            # Actualizar los datos del usuario en la base de datos
            cursor.execute("""
                UPDATE usuario
                SET tipo = %s, nombre = %s, contraseña = %s
                WHERE codigo = %s
            """, (tipo, nombre, contraseña, codigo))

        conexion.commit()
        print("Actualización de usuarios completada.")  # Confirmar que se completó la actualización
        return jsonify({'success': True, 'message': 'Usuarios actualizados exitosamente'}), 200
    except Exception as e:
        print("Error al actualizar usuarios:", e)  # Imprimir el error para depuración
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        if 'conexion' in locals() and conexion:
            conexion.close()

app.register_blueprint(usuarios_bp)

if __name__ == '__main__':
    app.run(debug=True)
