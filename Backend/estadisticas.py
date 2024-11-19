from flask import Blueprint, jsonify, request
import mysql.connector

estadisticas_bp = Blueprint('estadisticas_bp', __name__)

# Función para establecer la conexión a la base de datos
def obtener_conexion():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="siru"
    )

# Ruta para obtener estadísticas
@estadisticas_bp.route('/obtener_estadisticas', methods=['GET'])
def obtener_estadisticas_route():
    estado = request.args.get('estado')
    estadisticas = obtener_estadisticas(estado)
    return jsonify(estadisticas)

def obtener_estadisticas(estado=None):
    connection = obtener_conexion()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT 
            COUNT(*) AS totalReportes,
            SUM(CASE WHEN estado = 'En proceso' THEN 1 ELSE 0 END) AS reportesEnProceso,
            SUM(CASE WHEN estado = 'Terminado' THEN 1 ELSE 0 END) AS reportesCompletados
        FROM reportes
    """
    
    # Agregar condiciones de estado si se proporciona
    if estado and estado != 'todos':
        query += " WHERE estado = %s"
        cursor.execute(query, (estado,))
    else:
        cursor.execute(query)

    estadisticas = cursor.fetchone()

    cursor.close()
    connection.close()
    return estadisticas

# Ruta para obtener reportes por zona
@estadisticas_bp.route('/obtener_reportes_por_zona', methods=['GET'])
def obtener_reportes_por_zona():
    estado = request.args.get('estado')
    connection = obtener_conexion()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT lugar, COUNT(*) AS total_reportes
        FROM reportes
    """
    
    # Agregar condiciones de estado si se proporciona
    if estado and estado != 'todos':
        query += " WHERE estado = %s"
        query += " GROUP BY lugar"
        cursor.execute(query, (estado,))
    else:
        query += " GROUP BY lugar"
        cursor.execute(query)

    resultados = cursor.fetchall()

    cursor.close()
    connection.close()
    return jsonify(resultados)

# Ruta para obtener reportes por ítem
@estadisticas_bp.route('/obtener_reportes_por_item', methods=['GET'])
def obtener_reportes_por_item():
    estado = request.args.get('estado')
    connection = obtener_conexion()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT item, COUNT(*) AS total_reportes
        FROM reportes
    """
    
    # Agregar condiciones de estado si se proporciona
    if estado and estado != 'todos':
        query += " WHERE estado = %s"
        query += " GROUP BY item"
        cursor.execute(query, (estado,))
    else:
        query += " GROUP BY item"
        cursor.execute(query)

    resultados = cursor.fetchall()

    cursor.close()
    connection.close()
    return jsonify(resultados)

# Ruta para obtener reportes por desarrollo
@estadisticas_bp.route('/obtener_reportes_por_desarrollo', methods=['GET'])
def obtener_reportes_por_desarrollo():
    estado = request.args.get('estado')
    connection = obtener_conexion()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT d.nombreencargado, COUNT(r.idreporte) AS total_reportes
        FROM desarrollo d
        JOIN reportes r ON d.fkreporte = r.idreporte
    """
    
    # Agregar condiciones de estado si se proporciona
    if estado and estado != 'todos':
        query += " WHERE r.estado = %s"
        query += " GROUP BY d.nombreencargado"
        cursor.execute(query, (estado,))
    else:
        query += " GROUP BY d.nombreencargado"
        cursor.execute(query)

    resultados = cursor.fetchall()

    cursor.close()
    connection.close()
    return jsonify(resultados)
