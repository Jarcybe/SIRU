from flask import Flask, request
import mysql.connector

app = Flask(__name__)

def conectar_bd():
    try:
        conexion = mysql.connector.connect(
            host="localhost",
            user="tu_usuario",
            password="tu_contraseña",
            database="tu_base_de_datos"
        )
        print("Conexión exitosa a la base de datos.")
        return conexion
    except mysql.connector.Error as error:
        print("Error al conectar a la base de datos:", error)
        return None

@app.route('/registro', methods=['POST'])
def registro():
    try:
        conexion = conectar_bd()
        if conexion:
            datos = request.json
            cursor = conexion.cursor()
            cursor.execute("INSERT INTO Usuario (codigo, tipo, nombre, contraseña) VALUES (%s, %s, %s, %s)",
                           (datos['codigo'], datos['tipo'], datos['nombre'], datos['contraseña']))
            conexion.commit()
            cursor.close()
            conexion.close()
            return {'mensaje': 'Registro exitoso'}, 200
        else:
            return {'mensaje': 'Error al conectar a la base de datos'}, 500
    except Exception as e:
        print("Error al registrar usuario:", e)
        return {'mensaje': 'Error interno del servidor'}, 500

if __name__ == '__main__':
    app.run(debug=True)
