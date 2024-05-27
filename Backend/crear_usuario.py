from flask import Blueprint, request, jsonify
from models import db, Usuario

crear_usuario_bp = Blueprint('crear_usuario', __name__)

@crear_usuario_bp.route('/crear_usuario', methods=['POST'])
def crear_usuario():
    try:
        # Obtener los datos del nuevo usuario del cuerpo de la solicitud
        nuevo_usuario = request.json

        # Crear un nuevo objeto Usuario con los datos recibidos
        usuario = Usuario(
            codigo=nuevo_usuario['codigo'],
            tipo=nuevo_usuario['tipo'],
            nombre=nuevo_usuario['nombre'],
            contraseña=nuevo_usuario['contraseña']
        )

        # Agregar el nuevo usuario a la base de datos
        db.session.add(usuario)
        db.session.commit()

        # Devolver una respuesta indicando el éxito de la operación
        return jsonify({'success': True}), 201
    except Exception as e:
        print(f"Error al crear el usuario: {e}")
        return jsonify({'success': False, 'error': 'Error al crear el usuario'}), 500
