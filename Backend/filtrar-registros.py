from flask import Flask, request, jsonify

app = Flask(__name__)

# Ruta para manejar la solicitud de filtrado de registros
@app.route('/filtrar-registros', methods=['POST'])
def filtrar_registros():
    # Obtener los parámetros de filtrado del cuerpo de la solicitud
    parametros = request.json

    # Realizar el filtrado de registros basado en los parámetros recibidos
    registros_filtrados = filtrar_registros_en_bd(parametros)

    # Devolver los registros filtrados como respuesta en formato JSON
    return jsonify(registros_filtrados)

# Función para filtrar registros en base de datos
def filtrar_registros_en_bd(parametros):
    # Aquí deberías realizar consultas a la base de datos para filtrar los registros
    # basándote en los parámetros recibidos en la solicitud

    # Por ahora, devolvemos registros de ejemplo
    registros = [
        {"titulo": "Registro 1", "descripcion": "Descripción del registro 1", "fecha": "2024-05-28"},
        {"titulo": "Registro 2", "descripcion": "Descripción del registro 2", "fecha": "2024-05-27"}
    ]

    # Filtrar registros en base a los parámetros recibidos
    registros_filtrados = registros

    # Filtrar por código o nombre de usuario
    if 'codigo_nombre' in parametros:
        codigo_nombre = parametros['codigo_nombre'].lower()
        registros_filtrados = [registro for registro in registros_filtrados
                               if codigo_nombre in registro['codigo'].lower() or codigo_nombre in registro['nombre'].lower()]

    # Filtrar por lugar
    if 'lugar' in parametros:
        lugar = parametros['lugar'].lower()
        registros_filtrados = [registro for registro in registros_filtrados if lugar in registro['lugar'].lower()]

    # Filtrar por item
    if 'item' in parametros:
        item = parametros['item'].lower()
        registros_filtrados = [registro for registro in registros_filtrados if item in registro['item'].lower()]

    # Filtrar por estado
    if 'estado' in parametros:
        estado = parametros['estado'].lower()
        registros_filtrados = [registro for registro in registros_filtrados if registro['estado'].lower() == estado]

    # Filtrar por desarrollo
    if 'desarrollo' in parametros:
        desarrollo = parametros['desarrollo'].lower()
        registros_filtrados = [registro for registro in registros_filtrados if registro['desarrollo'].lower() == desarrollo]

    # Ordenar registros
    if 'orden' in parametros:
        orden = parametros['orden'].lower()
        if orden == 'reciente':
            registros_filtrados.sort(key=lambda x: x['fecha'], reverse=True)
        elif orden == 'antiguo':
            registros_filtrados.sort(key=lambda x: x['fecha'])

    return registros_filtrados

if __name__ == '__main__':
    app.run(debug=True)
