from flask import Blueprint, jsonify, request
import mysql.connector

guardar_reporte_bp = Blueprint('guardar_reporte', __name__)


def conectar_bd():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="siru"
    )

@guardar_reporte_bp.route('/guardar_reporte', methods=['POST'])
def guardar_formulario_route():
    conexion = None
    try:
        datos = request.json
        correo = datos.get('correo')
        fecha = datos.get('fecha')
        lugar = datos.get('lugar')
        item = datos.get('item')
        tipo = datos.get('tipo')
        titulo = datos.get('titulo')
        descripcion = datos.get('descripcion')
        imagen_path = datos.get('imagen', None)

     
        if imagen_path and imagen_path.startswith('Backend/'):
            imagen_path = imagen_path.replace('Backend/', '', 1)  

        conexion = conectar_bd()
        cursor = conexion.cursor()

        if imagen_path:
            cursor.execute("INSERT INTO reportes (fkcorreousuario, fecha, lugar, item, tipo, titulo, descripcion, imagen) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                           (correo, fecha, lugar, item, tipo, titulo, descripcion, imagen_path))
        else:
            cursor.execute("INSERT INTO reportes (fkcorreousuario, fecha, lugar, item, tipo, titulo, descripcion) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                           (correo, fecha, lugar, item, tipo, titulo, descripcion))

        conexion.commit()
        return jsonify({'success': True, 'message': 'Reporte guardado exitosamente'}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        if conexion:
            conexion.close()
