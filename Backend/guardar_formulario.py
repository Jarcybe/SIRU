from flask import Blueprint, jsonify, request
import mysql.connector
from datetime import datetime

guardar_formulario_bp = Blueprint('guardar_formulario', __name__)

# Configurar la conexión a la base de datos MySQL
conexion = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="siru"
)

# Manejar las solicitudes POST en la ruta "/guardar_formulario"
@guardar_formulario_bp.route('/guardar_formulario', methods=['POST'])
def guardar_formulario_route():
    try:
        # Obtener los datos del formulario del cuerpo de la solicitud
        formulario = request.json

        # Obtener la fecha y hora actual y formatearla
        fecha_actual = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        # Insertar los datos del formulario en la base de datos
        cursor = conexion.cursor()
        cursor.execute("INSERT INTO FormularioRegistro (codigo, fecha, lugar, item, estado, titulo, descripcion) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                       (formulario['codigo'], fecha_actual, formulario['lugar'], formulario['item'], formulario['estado'], formulario['titulo'], formulario['descripcion']))
        conexion.commit()
        return jsonify({'success': True, 'message': 'Formulario guardado exitosamente'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        if conexion:
            conexion.close()
