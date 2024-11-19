from flask import Blueprint, jsonify, request
import mysql.connector

registros_bp = Blueprint('registros_bp', __name__)

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

@registros_bp.route('/obtener_registros', methods=['GET'])
def obtener_registros():
    conexion = conectar_bd()
    if conexion is None:
        return jsonify({"error": "No se pudo conectar a la base de datos"}), 500

    cursor = conexion.cursor(dictionary=True)
    cursor.execute("""
        SELECT r.*, u.nombre AS nombre_usuario
        FROM reportes r
        LEFT JOIN usuarios u ON r.fkcorreousuario = u.correo
    """)
    registros = cursor.fetchall()
    cursor.close()
    conexion.close()

    for registro in registros:
        if registro['imagen']:
            registro['imagen'] = f"/uploads/{registro['imagen']}"  

    return jsonify({"registros": registros})

## FILTRACION PARA LOS REPORTES ESPECIFICOS A ENCARGADOS
@registros_bp.route('/obtener_reportes_por_claseitem/<tipo>', methods=['GET'])
def obtener_reportes_por_claseitem(tipo):
    conexion = conectar_bd()
    if conexion is None:
        return jsonify({"error", "No se pudo conectar a la base de datos"}), 500
    
    cursor = conexion.cursor(dictionary=True)
    try:
        cursor.execute("SELECT tipo FROM usuarios WHERE correo = %s",
                       (tipo,))
        usuario = cursor.fetchone()

        if not usuario:
            return jsonify({"error": "Tipo de usuario no encontrado"}), 404
        
        tipo_usuario = usuario['tipo']

        clases_por_tipo = {
            "EncargadoGeneral": "generales",
            "EncargadoElectrico": "electricos",
            "EncargadoFontaneria": "baños",
            "EncargadoSalones": "salones",
            "EncargadoInformatico": "informaticos"
        }

        clase_correspondiente = clases_por_tipo.get(tipo_usuario)
        if not clase_correspondiente:
            return jsonify({"error": "Tipo de usuario no válido"}), 403
        
        query = """
              SELECT r.*, i.claseitem, u.nombre AS nombre
              FROM reportes r
              INNER JOIN items i ON r.item = i.nombreitem
              INNER JOIN usuarios u ON r.fkcorreousuario = u.correo
              WHERE i.claseitem = %s
              """
        
        cursor.execute(query, (clase_correspondiente,))
        reportes = cursor.fetchall()

        
        for registro in reportes:
            if registro['imagen']:
                  registro['imagen'] = f"/uploads/{registro['imagen']}"  

        return jsonify(reportes)
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Ocurrió un error en el servidor"}), 500
    finally:
        cursor.close()
        conexion.close()

## CONSIGUE LOS DATOS DEL REPORTE EN CUESTION POR MEDIO DE SU ID PARA MOSTRAR SUS DATOS
@registros_bp.route('/obtener_registro/<int:id>', methods=['GET'])
def obtener_registro(id):
    conexion = conectar_bd()
    if conexion is None:
        return jsonify({"error": "No se pudo conectar a la base de datos"}), 500

    cursor = conexion.cursor(dictionary=True)
    
    ## Consigo los datos correspondientes de los rpeortes
    cursor.execute("""
        SELECT r.*, u.nombre AS nombre_usuario
        FROM reportes r
        LEFT JOIN usuarios u ON r.fkcorreousuario = u.correo
        WHERE r.idreporte = %s
    """, (id,))
    registro = cursor.fetchone()
    
    cursor.execute("""
        SELECT fecha, nombreencargado, comentario
        FROM desarrollo
        WHERE fkreporte = %s
        ORDER BY fecha
    """, (id,))
    historial = cursor.fetchall()
    
    
    cursor.close()
    conexion.close()

    if registro:
        return jsonify({"registro": registro, "historial": historial})
    else:
        return jsonify({"error": "Registro no encontrado"}), 404

# ELIMINAR REGISTRO TOTALMENTE
@registros_bp.route('/eliminar_registro/<int:id>', methods=['DELETE'])
def eliminar_registro(id):
    conexion = conectar_bd()
    if conexion is None:
        return jsonify({"error": "No se pudo conectar a la base de datos"}), 500

    cursor = conexion.cursor()
    try:
        cursor.execute("DELETE FROM reportes WHERE idreporte = %s", 
                       (id,))
        conexion.commit()
    except mysql.connector.Error as error:
        print("Error al eliminar el registro:", error)
        conexion.rollback()
        cursor.close()
        conexion.close()
        return jsonify({"error": "Error al eliminar el registro"}), 500

    cursor.close()
    conexion.close()
    return jsonify({"mensaje": "Registro eliminado correctamente"})

