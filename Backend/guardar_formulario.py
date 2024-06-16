from flask import Blueprint, jsonify, request
import mysql.connector

guardar_formulario_bp = Blueprint('guardar_formulario', __name__)

# Función para conectar a la base de datos
def conectar_bd():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="siru"
    )

@guardar_formulario_bp.route('/guardar_formulario', methods=['POST'])
def guardar_formulario_route():
    conexion = None
    try:
        datos = request.json
        codigo = datos.get('codigo')
        fecha = datos.get('fecha')
        lugar = datos.get('lugar')
        item = datos.get('item')
        estado = datos.get('estado')
        titulo = datos.get('titulo')
        descripcion = datos.get('descripcion')
        imagen_path = datos.get('imagen', None)

        # Asegurar que la ruta de la imagen no contenga el prefijo 'Backend/'
        if imagen_path and imagen_path.startswith('Backend/'):
            imagen_path = imagen_path.replace('Backend/', '', 1)  # Eliminar solo el primer 'Backend/'

        conexion = conectar_bd()
        cursor = conexion.cursor()

        if imagen_path:
            cursor.execute("INSERT INTO FormularioRegistro (codigo, fecha, lugar, item, estado, titulo, descripcion, imagen) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                           (codigo, fecha, lugar, item, estado, titulo, descripcion, imagen_path))
        else:
            cursor.execute("INSERT INTO FormularioRegistro (codigo, fecha, lugar, item, estado, titulo, descripcion) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                           (codigo, fecha, lugar, item, estado, titulo, descripcion))

        conexion.commit()
        return jsonify({'success': True, 'message': 'Formulario guardado exitosamente'}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        if conexion:
            conexion.close()
