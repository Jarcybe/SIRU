from flask import Blueprint, request, jsonify
from . import db


actualizar_reporte_bp = Blueprint('actualizar_reporte', __name__)

@actualizar_reporte_bp.route('/actualizar_reporte', methods=['POST'])
def actualizar_reporte():
    datos = request.json

    codigo = datos.get('codigo')
    comentario = datos.get('comentario')
    encargado = datos.get('encargado')
    desarrollo = datos.get('desarrollo')

    usuario = Usuario.query.filter_by(codigo=codigo).first()
    
    if usuario:
        usuario.comentario = comentario
        usuario.encargado = encargado
        usuario.desarrollo = desarrollo
        db.session.commit()
        return jsonify({'success': True, 'mensaje': 'Datos actualizados correctamente.'})
    else:
        return jsonify({'success': False, 'mensaje': 'Usuario no encontrado.'}), 404
