from flask import Blueprint, jsonify, request
from models import db, Registro

eliminar_registro_bp = Blueprint('eliminar_registro', __name__)

@eliminar_registro_bp.route('/eliminar_registro', methods=['POST'])
def eliminar_registro():
    try:
        data = request.get_json()
        codigo = data.get('codigo')
        index = data.get('index')

        # Obtener el registro a eliminar
        registro = Registro.query.filter_by(codigo=codigo).all()[index]

        # Eliminar el registro de la base de datos
        db.session.delete(registro)
        db.session.commit()

        # Devolver una respuesta exitosa
        return jsonify({'message': 'Registro eliminado exitosamente'}), 200

    except Exception as e:
        print(f"Error al eliminar el registro: {e}")
        return jsonify({'error': 'Error al eliminar el registro'}), 500
