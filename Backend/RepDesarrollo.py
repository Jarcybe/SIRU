from flask import Blueprint, jsonify, request
import mysql.connector

Desarrollo_de_los_reportes_bp = Blueprint('Desarrollo_de_los_reportes_bp', __name__)


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
    
@Desarrollo_de_los_reportes_bp.route('/guardar_desarrollo', methods=['POST'])
def guardar_desarrollo():
    data = request.json
    
    idreporte = data.get('idreporte')
    fkcorreoencargado = data.get('fkcorreoencargado')
    comentario = data.get('comentario')
    estado = data.get('estado', 'En proceso')
    fecha = data.get('fecha')

    conexion = conectar_bd()
    if conexion is None:
        return jsonify({"error": "No se pudo conectar a la base de datos"}), 500
    
    cursor = conexion.cursor()

    try:
        
        # Obtener nombre del encargado
        cursor.execute("""
            SELECT nombre FROM usuarios WHERE correo = %s
        """, (fkcorreoencargado,))
        nombre_encargado = cursor.fetchone()[0]

        #insertar nuevo desarrollo
        cursor.execute("""
            INSERT INTO desarrollo (fkreporte, fkcorreoencargado, nombreencargado, comentario, fecha)
              VALUES(%s, %s, %s, %s, %s)""",
        (idreporte, fkcorreoencargado, nombre_encargado, comentario, fecha))

        iddesarrollo = cursor.lastrowid

        cursor.execute("""
            UPDATE reportes
                       SET fkdesarrollo = %s, estado = %s
                       WHERE idreporte = %s 
          """, (iddesarrollo, estado, idreporte))
        
        cursor.execute("""
                       SELECT titulo, fkcorreousuario 
                       FROM reportes
                       WHERE idreporte = %s
        """,(idreporte,))

        data_reporte = cursor.fetchone()
        titulo =  data_reporte[0]
        correo = data_reporte[1]

        if estado == "En proceso":
              enunciado = f"Tu reporte {titulo} ya fue visto y ya empezó un desarrollo"
        elif estado == "Terminado":
            enunciado = f"Tu reporte {titulo} ya ha sido revisado y ha terminado su desarrollo"
        else:
            enunciado = ""

        cursor.execute("""
               SELECT * FROM notificaciones
               WHERE fkcorreousuario = %s AND vistonovisto = 0
               AND enunciado LIKE %s
               """, (fkcorreoencargado, enunciado))
        notificacion_existente = cursor.fetchone()

        if notificacion_existente is None and enunciado:
            # Insertar notificación si no se ha enviado
            cursor.execute("""
                INSERT INTO notificaciones (fkcorreousuario, nombreautor, fecha, enunciado, vistonovisto, remitente)
                VALUES (%s, %s, %s, %s, 0, %s)
            """, (fkcorreoencargado, nombre_encargado, fecha, enunciado, correo))

        cursor.fetchall()
        conexion.commit()
        return jsonify({"message": "Desarrollo guardado con exito"})
    
    except Exception as e:
        conexion.rollback()
        print("Error:", e)
        return jsonify({"error": "Ocurrió un error al guardar el desarrollo"}), 500
    finally:
        cursor.close()
        conexion.close()

@Desarrollo_de_los_reportes_bp.route('/obtener_historial/<int:id>', methods=['GET'])
def obtener_historial(id):
    conexion = conectar_bd()
    if conexion is None:
        return jsonify({"error": "Nos e pudo conectar a la base d datos"}), 500
    
    cursor = conexion.cursor(dictionary=True)
    try: 
        cursor.execute("""
              SELECT fecha, nombreencargado, comentario
                       FROM desarrollo
                       WHERE fkreporte = %s
                       ORDER BY fecha
                """, (id,))
        
        historial = cursor.fetchall()
        return jsonify(historial)
    
    except Exception as e:
        print("Error", e)
        return jsonify({"error": "Error al obtener historial"}), 500
    finally:
        cursor.close()
        conexion.close()
        