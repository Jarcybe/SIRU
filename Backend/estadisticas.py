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

@estadisticas_bp.route('/enviar_informe', methods=['POST'])
def enviar_informe():
    data = request.get_json()
    email = data.get('email')
    images = data.get('images', [])

    # Crear el mensaje
    msg = MIMEMultipart()
    msg['From'] = 'sirunivalle@gmail.com'  # Cambia esto si es necesario
    msg['To'] = email
    msg['Subject'] = 'Informe de Gráficas'

    # Adjuntar imágenes
    for index, img_data in enumerate(images):
        img_data = img_data.split(',')[1]  # Obtener solo la parte de la imagen
        img_bytes = base64.b64decode(img_data)

        # Guardar la imagen en un objeto BytesIO
        img = Image.open(io.BytesIO(img_bytes))
        img_path = f"temp_image_{index}.png"
        img.save(img_path)

        # Adjuntar la imagen al correo
        with open(img_path, 'rb') as img_file:
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(img_file.read())
            encoders.encode_base64(part)
            part.add_header('Content-Disposition', f'attachment; filename={img_path}')
            msg.attach(part)

        # Eliminar la imagen temporal
        os.remove(img_path)

    # Enviar el correo usando la función enviar_correo
    try:
        enviar_correo(email, msg['Subject'], msg.as_string())
        return jsonify({'message': 'Informe enviado exitosamente.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

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

@estadisticas_bp.route('/enviar_correo', methods=['POST'])
def enviar_correo():
    data = request.get_json()
    destinatario = data.get('email')
    asunto = data.get('subject')
    cuerpo = data.get('body')

    # Configuración del servidor SMTP
    remitente = 'sirunivalle@gmail.com' 
    contra = 'hqru wcwf ssya ozam'  # Cambia esto por tu contraseña real
    servidor = smtplib.SMTP('smtp.gmail.com', 587)
    servidor.starttls()
    servidor.login(remitente, contra)

    # Crear el mensaje
    mensaje = MIMEText(cuerpo)
    mensaje['From'] = remitente
    mensaje['To'] = destinatario
    mensaje['Subject'] = asunto

    # Enviar el correo
    try:
        servidor.sendmail(remitente, destinatario, mensaje.as_string())
        return jsonify({'message': 'Correo enviado exitosamente.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        servidor.quit()
