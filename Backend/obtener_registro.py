from flask import Blueprint, request, jsonify
from models import db, Registro, Usuario

obtener_registro_bp = Blueprint('obtener_registro', __name__)

@obtener_registro_bp.route('/obtener_registro', methods=['GET'])
def obtener_registro():
    try:
        index = int(request.args.get('index'))
        registro = Registro.query.get(index)
        if registro:
            usuario = Usuario.query.filter_by(codigo=registro.codigo).first()
            nombre_usuario = usuario.nombre if usuario else "Desconocido"
            return jsonify({'success': True, 'registro': registro.to_dict(), 'nombre_usuario': nombre_usuario})
        else:
            return jsonify({'success': False, 'error': 'Registro no encontrado'})
    except Exception as e:
        print(f"Error al obtener el registro: {e}")
        return jsonify({'success': False, 'error': 'Error al obtener el registro'})
