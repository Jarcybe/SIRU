from flask import Blueprint, request, jsonify
from models import db, Usuario

obtener_usuarios_bp = Blueprint('obtener_usuarios', __name__)

@obtener_usuarios_bp.route('/obtener_usuarios', methods=['GET'])
def obtener_usuarios():
    try:
        filtro = request.args.get('filtro', 'todos')
        if filtro == 'todos':
            usuarios = Usuario.query.all()
        else:
            usuarios = Usuario.query.filter_by(tipo=filtro).all()

        usuarios_json = [{'codigo': usuario.codigo, 'tipo': usuario.tipo, 'nombre': usuario.nombre, 'contraseña': usuario.contraseña} for usuario in usuarios]

        return jsonify({'success': True, 'usuarios': usuarios_json})
    except Exception as e:
        print(f"Error al obtener usuarios: {e}")
        return jsonify({'success': False})
