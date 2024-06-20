from flask import Blueprint, request, jsonify
import mysql.connector

crear_codigo_bp = Blueprint('crear_codigo_bp', __name__)


conexion = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="siru"
)

# Manejar las solicitudes POST en la ruta /crear_codigo
@crear_codigo_bp.route('/crear_codigo', methods=['POST'])
def crear_codigo():
    # Obtener los datos enviados desde el cliente
    data = request.json
    codigo = data.get('codigo')
    tipo = data.get('tipo')
    nombre = data.get('nombre')
    contraseña = data.get('contraseña')

    # Verificar si el código ya existe en la base de datos
    cursor = conexion.cursor()
    cursor.execute("SELECT * FROM Usuario WHERE codigo = %s", (codigo,))
    usuario_existente = cursor.fetchone()
    if usuario_existente:
        return jsonify({'success': False, 'message': 'El código ya existe'})

    # Insertar un nuevo registro en la tabla Usuario
    cursor.execute("INSERT INTO Usuario (codigo, tipo, nombre, contraseña) VALUES (%s, %s, %s, %s)", (codigo, tipo, nombre, contraseña))
    conexion.commit()

    return jsonify({'success': True, 'message': 'Código creado exitosamente'})
