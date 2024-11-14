from flask import Blueprint, jsonify, request
import mysql.connector

filtro_bp = Blueprint('filtro_bp', __name__)

# Configurar la conexión a la base de datos MySQL
conexion = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="siru"
)

# Manejar las solicitudes GET en la ruta "/filtrar_registros"
@filtro_bp.route('/f', methods=['GET'])
def filtrar_registros():
    try:
        # Obtener los parámetros de filtrado de la consulta GET
        lugar = request.args.get('lugar', '').lower()
        item = request.args.get('item', '').lower()
        tipo = request.args.get('tipo', '')

        #desarrollo = request.args.get('desarrollo', '')
       # reciente = request.args.get('reciente', '')
        orden = request.args.get('orden', '')

        # Construir la consulta SQL basada en los parámetros de filtrado
        consulta = "SELECT * FROM reportes WHERE 1=1"
        parametros = []

        if lugar:
            consulta += " AND LOWER(lugar) LIKE %s"
            parametros.append(f"%{lugar}%")
        if item:
            consulta += " AND LOWER(item) LIKE %s"
            parametros.append(f"%{item}%")
        if tipo:
            consulta += " AND tipo = %s"
            parametros.append(tipo)
      ##  if desarrollo:
        ##    consulta += " AND LOWER(desarrollo) = %s"
          ##  parametros.append(desarrollo.lower())
    ##    if reciente:
      ##      if reciente == "Ninguna":
        ##        consulta += " AND (comentario IS NULL OR encargado IS NULL)"
          ##  elif reciente == "Comentario":
            ###    consulta += " AND comentario IS NOT NULL"
            #elif reciente == "Encargado":
             #   consulta += " AND encargado IS NOT NULL"
            #elif reciente == "Ambas":
             #   consulta += " AND comentario IS NOT NULL AND encargado IS NOT NULL"

        if orden == "Reciente":
            consulta += " ORDER BY fecha DESC"
        elif orden == "Antiguo":
            consulta += " ORDER BY fecha ASC"

        # Ejecutar la consulta SQL en la base de datos
        cursor = conexion.cursor(dictionary=True)
        cursor.execute(consulta, parametros)
        registros = cursor.fetchall()
        cursor.close()

        return jsonify({'success': True, 'registros': registros})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
