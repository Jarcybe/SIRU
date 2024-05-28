import mysql.connector

def conectar_bd():
    try:
        # Establecer la conexión a la base de datos
        conexion = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="siru"
        )
        print("Conexión exitosa a la base de datos.")
        return conexion
    except mysql.connector.Error as error:
        print("Error al conectar a la base de datos:", error)
        return None

if __name__ == "__main__":
    # Intentar conectar a la base de datos
    conexion = conectar_bd()
