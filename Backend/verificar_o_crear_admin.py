from flask import Blueprint, jsonify, request
from models import db, Usuario

crear_si_no_existe_bp = Blueprint('crear_si_no_existe', __name__)

@crear_si_no_existe_bp.route('/verificar_o_crear_admin', methods=['POST'])
def verificar_o_crear_admin():
    try:
        # Verificar si existe un usuario administrador con el código "admin"
        existe_admin = db.session.query(Usuario).filter_by(codigo='admin', tipo='Admin').first()

        if existe_admin:
            return jsonify({'existe_admin': True}), 200
        else:
            # Si no existe, crear un nuevo usuario administrador predeterminado
            nuevo_usuario = {
                'codigo': 'admin',
                'tipo': 'Admin',
                'nombre': 'Admin',
                'contraseña': 'admin'
            }

            # Crear un nuevo objeto Usuario con los datos del nuevo usuario administrador
            usuario = Usuario(
                codigo=nuevo_usuario['codigo'],
                tipo=nuevo_usuario['tipo'],
                nombre=nuevo_usuario['nombre'],
                contraseña=nuevo_usuario['contraseña']
            )

            # Agregar el nuevo usuario administrador a la base de datos
            db.session.add(usuario)
            db.session.commit()

            # Devolver una respuesta indicando que se creó el usuario administrador
            return jsonify({'existe_admin': False, 'success': True}), 201

    except Exception as e:
        print(f"Error al verificar o crear el usuario administrador: {e}")
        return jsonify({'error': 'Error al verificar o crear el usuario administrador'}), 500
