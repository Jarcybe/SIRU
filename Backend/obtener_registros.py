from flask import Blueprint, jsonify
from models import db, Registro, Usuario

obtener_registros_bp = Blueprint('obtener_registros', __name__)

@obtener_registros_bp.route('/obtener_registros', methods=['GET'])
def obtener_registros():
    try:
        registros = Registro.query.all()

        registros_con_nombre = []
        for registro in registros:
            usuario = Usuario.query.filter_by(codigo=registro.codigo).first()
            nombre_usuario = usuario.nombre if usuario else "Desconocido"
            registros_con_nombre.append({
                'titulo': registro.titulo,
                'fecha': registro.fecha,
                'codigo': registro.codigo,
                'nombre': nombre_usuario,
                'descripcion': registro.descripcion
            })

        return jsonify({'success': True, 'registros': registros_con_nombre})
    except Exception as e:
        print(f"Error al obtener registros: {e}")
        return jsonify({'success': False})
