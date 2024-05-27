from flask import Blueprint, request, jsonify
from models import db, Usuario

registro_bp = Blueprint('registro', __name__)

@registro_bp.route('/registro', methods=['POST'])
def registro():
    datos = request.json

    codigo = datos.get('codigo')
    nombre = datos.get('nombre')
    contraseña = datos.get('contraseña')

    # Verificar si el usuario ya existe en la base de datos
    usuario_existente = Usuario.query.filter_by(codigo=codigo).first()
    if usuario_existente:
        return jsonify({'mensaje': 'El código de usuario ya está en uso'}), 400

    # Crear un nuevo usuario
    nuevo_usuario = Usuario(codigo=codigo, nombre=nombre, contraseña=contraseña)
    db.session.add(nuevo_usuario)
    db.session.commit()

    return jsonify({'mensaje': 'Usuario registrado exitosamente'})
