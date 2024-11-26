from flask import Blueprint, jsonify, request, send_file
import mysql.connector
import matplotlib.pyplot as plt
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from fpdf import FPDF  # Asegúrate de tener fpdf instalado
import numpy as np
import base64
import io
from PIL import Image
from email.mime.base import MIMEBase
from email import encoders
from Backend.RegistroCorreoNuevoUsuario import enviar_correo  # Asegúrate de que la ruta sea correcta
from email.mime.text import MIMEText

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

# Ruta para obtener reportes por estado
@estadisticas_bp.route('/obtener_reportes_por_estado', methods=['GET'])
def obtener_reportes_por_estado_route():
    connection = obtener_conexion()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT estado, COUNT(*) AS total_reportes
        FROM reportes
        GROUP BY estado;
    """
    cursor.execute(query)
    resultados = cursor.fetchall()

    cursor.close()
    connection.close()
    return jsonify(resultados)

# Ruta para obtener reportes por tipo
@estadisticas_bp.route('/obtener_reportes_por_tipo', methods=['GET'])
def obtener_reportes_por_tipo_route():
    connection = obtener_conexion()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT tipo, COUNT(*) AS total_reportes
        FROM reportes
        GROUP BY tipo;
    """
    cursor.execute(query)
    resultados = cursor.fetchall()

    cursor.close()
    connection.close()
    return jsonify(resultados)

# Ruta para obtener reportes por lugar
@estadisticas_bp.route('/obtener_reportes_por_lugar', methods=['GET'])
def obtener_reportes_por_lugar_route():
    connection = obtener_conexion()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT lugar, COUNT(*) AS total_reportes
        FROM reportes
        GROUP BY lugar;
    """
    cursor.execute(query)
    resultados = cursor.fetchall()

    cursor.close()
    connection.close()
    return jsonify(resultados)

@estadisticas_bp.route('/descargar_graficas_pdf', methods=['POST'])
def descargar_graficas_pdf():
    data = request.get_json()
    images = data.get('images', [])

    # Crear un nuevo PDF
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)

    # Agregar cada imagen al PDF
    for img_data in images:
        # Decodificar la imagen base64
        img_data = img_data.split(',')[1]  # Obtener solo la parte de la imagen
        img_bytes = base64.b64decode(img_data)

        # Guardar la imagen en un objeto BytesIO
        img = Image.open(io.BytesIO(img_bytes))
        img_path = "temp_image.png"
        img.save(img_path)

        pdf.add_page()
        pdf.image(img_path, x=10, y=10, w=190)  # Ajusta la posición y tamaño según sea necesario

    # Guardar el PDF
    pdf_file_path = "graficas.pdf"
    pdf.output(pdf_file_path)

    # Devolver el archivo PDF
    return send_file(pdf_file_path, as_attachment=True)

def enviar_correo_estadistico(destinatario, asunto, cuerpo, archivos_adjuntos):
    #remitente = 'sirunivalle@gmail.com'  # Cambia esto si es necesario
    #contra = 'hqru wcwf ssya ozam'        # Contraseña de la cuenta
    remitente = 'aguilaryoseph@gmail.com' 
    contra = 'ljyb iplw mnqp vqja'

    # Configuración del servidor SMTP
    servidor = smtplib.SMTP('smtp.gmail.com', 587)
    servidor.starttls()
    servidor.login(remitente, contra)

    # Crear el mensaje
    msg = MIMEMultipart()
    msg['From'] = remitente
    msg['To'] = destinatario
    msg['Subject'] = asunto
    msg.attach(MIMEText(cuerpo, 'plain'))

    # Adjuntar archivos (imágenes)
    for idx, archivo in enumerate(archivos_adjuntos):
        part = MIMEBase('application', 'octet-stream')
        part.set_payload(archivo)
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', f'attachment; filename=grafica_{idx + 1}.png')
        msg.attach(part)

    # Enviar el correo
    servidor.sendmail(remitente, destinatario, msg.as_string())
    servidor.quit()

@estadisticas_bp.route('/enviar_informe', methods=['POST'])
def enviar_informe():
    data = request.get_json()
    email = data.get('email')
    images = data.get('images', [])
    
    msg = MIMEMultipart()
    msg['From'] = 'sirunivalle@gmail.com'
    msg['To'] = email
    msg['Subject'] = 'Informe de Gráficas'

    # Adjuntar cada imagen
    for index, img_data in enumerate(images):
        img_data = img_data.split(',')[1]  # Eliminar la parte de tipo de dato (data:image/png;base64,)
        img_bytes = base64.b64decode(img_data)
        
        # Crear la imagen desde los bytes
        img = Image.open(io.BytesIO(img_bytes))
        img_filename = f'grafico_{index + 1}.png'
        
        # Convertir la imagen a bytes y adjuntarla
        img_bytes_io = io.BytesIO()
        img.save(img_bytes_io, format='PNG')
        img_bytes_io.seek(0)

        part = MIMEBase('application', 'octet-stream')
        part.set_payload(img_bytes_io.read())
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', f'attachment; filename={img_filename}')
        msg.attach(part)

        archivos_adjuntos = []
    for img_data in images:
     img_data = img_data.split(',')[1]  # Eliminar el prefijo data:image/png;base64,
     img_bytes = base64.b64decode(img_data)
     archivos_adjuntos.append(img_bytes)

    # Enviar el correo
    try:
        enviar_correo_estadistico(email, msg['Subject'], 'Informe de Gráficas adjuntas.', archivos_adjuntos)
        return jsonify({'message': 'Informe enviado exitosamente.'}), 200
    except Exception as e:
        print(f'Error en enviar_informe: {str(e)}')  # Agrega un print para el log
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500