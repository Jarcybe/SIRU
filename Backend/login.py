from flask import Blueprint, request, jsonify
import mysql.connector

# Crear un blueprint para el inicio de sesión
login_bp = Blueprint('login_bp', __name__)

# Función para verificar las credenciales del usuario en la base de datos
def verificar_credenciales(codigo, contraseña):
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="siru"
    )
    cursor = connection.cursor()

    # Asegurarse de seleccionar el campo 'tipo' en la consulta
    cursor.execute("SELECT id, codigo, tipo, nombre FROM Usuario WHERE codigo = %s AND contraseña = %s", (codigo, contraseña))
    usuario = cursor.fetchone()
    cursor.close()
    connection.close()
    return usuario

# Ruta para manejar el inicio de sesión
@login_bp.route('/login', methods=['POST'])
def login():
    datos = request.json
    codigo = datos.get('codigo')
    contraseña = datos.get('contraseña')
    usuario = verificar_credenciales(codigo, contraseña)
    
    if usuario:
        usuario_info = {
            'id': usuario[0],
            'codigo': usuario[1],
            'tipo': usuario[2],  # Asegurarse de incluir 'tipo'
            'nombre': usuario[3]
        }
        return jsonify({'success': True, 'usuario': usuario_info})
    else:
        return jsonify({'success': False, 'message': 'Código o contraseña incorrectos'})

# Asegúrate de que login_bp se registre correctamente en tu aplicación principal
