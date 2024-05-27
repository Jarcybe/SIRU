from flask import Flask, request, jsonify
from sqlalchemy import create_engine, Column, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

app = Flask(__name__)

# Conexión a la base de datos SQLite (puedes cambiar el motor y la URL según tu base de datos)
engine = create_engine('sqlite:///usuarios.db', echo=True)
Base = declarative_base()

# Definición de la tabla Usuarios
class Usuario(Base):
    __tablename__ = 'usuarios'

    codigo = Column(String, primary_key=True)
    contraseña = Column(String)
    tipo = Column(String)

# Crear la tabla en la base de datos si no existe
Base.metadata.create_all(engine)

# Crear una sesión para interactuar con la base de datos
Session = sessionmaker(bind=engine)
session = Session()

@app.route('/login', methods=['POST'])
def login():
    # Obtener los datos del formulario de la solicitud
    data = request.json
    codigo = data.get('codigo')
    contraseña = data.get('contraseña')

    # Buscar el usuario en la base de datos
    usuario = session.query(Usuario).filter_by(codigo=codigo, contraseña=contraseña).first()

    if usuario:
        # Si se encuentra el usuario, devolver los detalles del usuario como respuesta
        return jsonify({"usuario": {"codigo": usuario.codigo, "tipo": usuario.tipo}}), 200
    else:
        # Si no se encuentra el usuario, devolver un mensaje de error
        return jsonify({"error": "Código o contraseña incorrectos"}), 401

if __name__ == '__main__':
    app.run(debug=True)
