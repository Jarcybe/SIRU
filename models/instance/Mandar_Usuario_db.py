from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class Usuario(db.Model):
    codigo = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    contraseña = db.Column(db.String(50), nullable=False)

def guardar_usuario_en_bd(codigo, nombre, contraseña):
    nuevo_usuario = Usuario(codigo=codigo, nombre=nombre, contraseña=contraseña)
    db.session.add(nuevo_usuario)
    db.session.commit()

@app.route('/registro', methods=['POST'])
def registro():
    datos_json = request.json  # Obtener los datos JSON enviados desde el frontend

    # Extraer los datos del JSON
    codigo = datos_json['codigo']
    nombre = datos_json['nombre']
    contraseña = datos_json['contraseña']

    # Guardar usuario en la base de datos
    guardar_usuario_en_bd(codigo, nombre, contraseña)

    # Devolver una respuesta al frontend para indicar que la operación fue exitosa
    return jsonify({"mensaje": "Usuario registrado exitosamente en la base de datos"}), 201
