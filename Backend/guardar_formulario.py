from flask import Blueprint, jsonify, request
from werkzeug.utils import secure_filename
import os
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

UPLOAD_FOLDER = '/ruta/a/carpeta/de/imagenes'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@guardar_formulario_bp.route('/guardar_formulario', methods=['POST'])
def guardar_formulario_route():
    try:
        formulario = request.form

        if 'imagen' not in request.files:
            return jsonify({'success': False, 'error': 'No se ha enviado ninguna imagen'}), 400

        imagen = request.files['imagen']
        if imagen.filename == '':
            return jsonify({'success': False, 'error': 'No se ha seleccionado ningún archivo'}), 400

        if imagen and allowed_file(imagen.filename):
            filename = secure_filename(imagen.filename)
            imagen.save(os.path.join(UPLOAD_FOLDER, filename))

            fecha_actual = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            cursor = conexion.cursor()
            cursor.execute("INSERT INTO FormularioRegistro (codigo, fecha, lugar, item, estado, titulo, descripcion, imagen) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                           (formulario['codigo'], fecha_actual, formulario['lugar'], formulario['item'], formulario['estado'], formulario['titulo'], formulario['descripcion'], os.path.join(UPLOAD_FOLDER, filename)))
            conexion.commit()
            return jsonify({'success': True, 'message': 'Formulario guardado exitosamente'})
        else:
            return jsonify({'success': False, 'error': 'Formato de imagen no permitido'}), 400
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        if conexion:
            conexion.close()
