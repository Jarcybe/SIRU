from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os

subir_imagen_bp = Blueprint('subir_imagen_bp', __name__)

UPLOAD_FOLDER = 'Backend/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@subir_imagen_bp.route('/subir_imagen_temp', methods=['POST'])
def subir_imagen_temp():
    if 'imagen' not in request.files:
        return jsonify({'success': False, 'error': 'No se ha enviado ninguna imagen'}), 400

    imagen = request.files['imagen']
    if imagen.filename == '':
        return jsonify({'success': False, 'error': 'No se ha seleccionado ningún archivo'}), 400

    if imagen and allowed_file(imagen.filename):
        filename = secure_filename(imagen.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        imagen.save(filepath)
        return jsonify({'success': True, 'filepath': filepath})
    else:
        return jsonify({'success': False, 'error': 'Formato de imagen no permitido'}), 400
