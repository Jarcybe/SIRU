from flask import Blueprint, jsonify, request
import mysql.connector

notificaciones_bp = Blueprint('notificaciones_bp', __name__)

def conectar_bd():
    try:
        conexion = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="siru"
        )
        return conexion
    except mysql.connector.Error as error:
        print("Error al conectar a la base de datos:", error)
        return None
    
@notificaciones_bp.route('/conseguir_notis/<correo>', methods=['GET'])
def conseguir_notificaciones(correo):

    try:
       conexion = conectar_bd()
       cursor = conexion.cursor(dictionary=True)

       cursor.execute("SELECT idnotificacion, fecha, fkcorreousuario, nombreautor, enunciado, vistonovisto FROM notificaciones WHERE remitente = %s", (correo,))
       noti = cursor.fetchall()
       return jsonify(noti)
        
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Ocurrió un error al obtener las notificaciones"}), 500


@notificaciones_bp.route('/marcar_como_visto/<int:id>', methods=['POST'])
def marcar_como_visto(id):
    try:
        conexion = conectar_bd()
        cursor = conexion.cursor()

        cursor.execute("UPDATE notificaciones SET vistonovisto = 1 WHERE idnotificacion = %s", (id,))

        conexion.commit()
        return jsonify({"message": "Notificacion marcada como vista"}), 200      

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Ocurrió un error al marcar la notificación como vista"}), 500
    
#Obtiene los usuarios en esta el select
@notificaciones_bp.route('/get_users/<correo>', methods=['GET'])
def get_users(correo):
    # No es necesario usar request.json, ya que el correo se pasa en la URL
    conexion = conectar_bd()
    cursor = conexion.cursor(dictionary=True)

    query = "SELECT correo FROM usuarios WHERE correo != %s"
    cursor.execute(query, (correo,))
    usuarios = cursor.fetchall()

    cursor.close()
    conexion.close()

    return jsonify(usuarios)

# Manda el correo 
@notificaciones_bp.route('/enviar_notificacion', methods=['POST'])
def enviar_notificacion():
    data = request.json
    
    correoautor = data.get('correoautor')
    mensaje = data.get('mensaje')
    destinocorreo = data.get('destino')  #destino
    fecha = data.get('fecha')
    nombreautor = data.get('nombreautor')

    conexion = conectar_bd()
    if conexion is None:
        return jsonify({"error": "No se pudo conectar a la base de datos"}), 500
    
    cursor = conexion.cursor()

    try:

        # Insertar notificación
        cursor.execute("""
            INSERT INTO notificaciones (fkcorreousuario, nombreautor, fecha, enunciado, vistonovisto, remitente)
            VALUES (%s, %s, %s, %s, 0, %s)
        """, (correoautor, nombreautor, fecha, mensaje, destinocorreo))

        conexion.commit()
        return jsonify({"message": "Notificación enviada con éxito"})

    except Exception as e:
        conexion.rollback()
        print("Error:", e)
        return jsonify({"error": "Ocurrió un error al enviar la notificación"}), 500
    finally:
        cursor.close()
        conexion.close()