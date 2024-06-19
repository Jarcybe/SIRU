import mysql.connector

def obtener_usuarios(filtro):
    # Configurar la conexión a la base de datos MySQL
    conexion = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="siru"
    )

    cursor = conexion.cursor(dictionary=True)
    if filtro == 'todos':
        cursor.execute("SELECT * FROM Usuario")
    else:
        cursor.execute("SELECT * FROM Usuario WHERE tipo = %s", (filtro,))
    usuarios = cursor.fetchall()

    # Cerrar la conexión a la base de datos
    cursor.close()
    conexion.close()

    return usuarios


