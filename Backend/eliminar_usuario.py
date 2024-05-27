from flask import Blueprint, jsonify, request
from models import db, Usuario, Registro

eliminar_usuario_bp = Blueprint('eliminar_usuario', __name__)

@eliminar_usuario_bp.route('/eliminar_usuario', methods=['POST'])
def eliminar_usuario():
    try:
        data = request.get_json()
        codigo = data.get('codigo')

        # Eliminar el usuario de la base de datos
        usuario = Usuario.query.filter_by(codigo=codigo).first()
        db.session.delete(usuario)

        # Eliminar los registros asociados al usuario de la base de datos
        registros = Registro.query.filter_by(codigo=codigo).all()
        for registro in registros:
            db.session.delete(registro)

        db.session.commit()

        # Devolver una respuesta exitosa
        return jsonify({'message': 'Usuario y registros asociados eliminados exitosamente'}), 200

    except Exception as e:
        print(f"Error al eliminar el usuario y sus registros: {e}")
        return jsonify({'error': 'Error al eliminar el usuario y sus registros'}), 500
