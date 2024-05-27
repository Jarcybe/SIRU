from flask import Blueprint, request, jsonify
from models import db, Usuario

guardar_usuarios_bp = Blueprint('guardar_usuarios', __name__)

@guardar_usuarios_bp.route('/guardar_usuarios', methods=['POST'])
def guardar_usuarios():
    try:
        data = request.json
        usuarios = data.get('usuarios', [])

        for usuario_data in usuarios:
            codigo = usuario_data.get('codigo')
            tipo = usuario_data.get('tipo')
            nombre = usuario_data.get('nombre')
            contraseña = usuario_data.get('contraseña')

            # Buscar el usuario en la base de datos por su código
            usuario = Usuario.query.filter_by(codigo=codigo).first()
            if usuario:
                # Actualizar los datos del usuario
                usuario.tipo = tipo
                usuario.nombre = nombre
                usuario.contraseña = contraseña
            else:
                # Si el usuario no existe, crear uno nuevo
                nuevo_usuario = Usuario(codigo=codigo, tipo=tipo, nombre=nombre, contraseña=contraseña)
                db.session.add(nuevo_usuario)

        db.session.commit()  # Guardar los cambios en la base de datos

        return jsonify({'success': True})
    except Exception as e:
        print(f"Error al guardar los usuarios: {e}")
        db.session.rollback()  # Deshacer los cambios en caso de error
        return jsonify({'success': False})
