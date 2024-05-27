from flask import Blueprint, request, jsonify
from models import db, Reporte

buscar_reportes_bp = Blueprint('buscar_reportes', __name__)

@buscar_reportes_bp.route('/buscar_reportes', methods=['POST'])
def buscar_reportes():
    datos = request.json

    lugar = datos.get('lugar', '').lower()
    item = datos.get('item', '').lower()
    AntiguoReciente = datos.get('AntiguoReciente', '')
    estado = datos.get('estado', '')
    desarrollo = datos.get('desarrollo', '')
    reciente = datos.get('reciente', '')

    # Realizar la búsqueda en la base de datos según los criterios proporcionados
    query = Reporte.query.filter(Reporte.lugar.ilike(f'%{lugar}%'),
                                 Reporte.item.ilike(f'%{item}%'))

    if estado:
        query = query.filter(Reporte.estado.ilike(f'%{estado}%'))

    if desarrollo:
        query = query.filter(Reporte.desarrollo.ilike(f'%{desarrollo}%'))

    if reciente:
        if reciente == 'Ninguna':
            query = query.filter((Reporte.comentario == None) & (Reporte.encargado == None))
        elif reciente == 'Comentario':
            query = query.filter(Reporte.comentario != None)
        elif reciente == 'Encargado':
            query = query.filter(Reporte.encargado != None)
        elif reciente == 'Ambas':
            query = query.filter((Reporte.comentario != None) & (Reporte.encargado != None))

    if AntiguoReciente == 'Reciente':
        query = query.order_by(Reporte.fecha.desc())
    elif AntiguoReciente == 'Antiguo':
        query = query.order_by(Reporte.fecha.asc())

    reportes = query.all()

    # Preparar los datos para enviarlos al cliente
    datos_respuesta = {
        'success': True,
        'reportes': [{'titulo': reporte.titulo,
                      'lugar': reporte.lugar,
                      'item': reporte.item,
                      'estado': reporte.estado,
                      'desarrollo': reporte.desarrollo,
                      'fecha': reporte.fecha.strftime('%Y-%m-%d %H:%M:%S')} for reporte in reportes]
    }
    return jsonify(datos_respuesta)
