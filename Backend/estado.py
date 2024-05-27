from flask import Blueprint, jsonify, request
from models import db, Registro

estado_bp = Blueprint('estado', __name__)

@estado_bp.route('/estado', methods=['POST'])
def obtener_estado():
    try:
        data = request.get_json()
        codigo = data.get('codigo')

        # Obtener los registros asociados al usuario desde la base de datos
        registros = Registro.query.filter_by(codigo=codigo).all()

        # Convertir los registros a un formato JSON para enviarlos como respuesta
        registros_json = [{'titulo': registro.titulo} for registro in registros]

        # Devolver los registros como respuesta
        return jsonify(registros_json), 200

    except Exception as e:
        print(f"Error al obtener el estado del usuario: {e}")
        return jsonify({'error': 'Error al obtener el estado del usuario'}), 500
