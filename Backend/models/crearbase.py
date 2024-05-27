from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///siru.db'  # Usar SQLite para desarrollo local
db = SQLAlchemy(app)

# Definir el modelo Usuario
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    codigo = db.Column(db.String(255), unique=True, nullable=False)
    tipo = db.Column(db.String(255), nullable=False)
    nombre = db.Column(db.String(255), nullable=False)
    contraseña = db.Column(db.String(255), nullable=False)

# Definir el modelo FormularioRegistro
class FormularioRegistro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    codigo = db.Column(db.String(255), nullable=False)
    fecha = db.Column(db.TIMESTAMP, nullable=False)
    lugar = db.Column(db.String(255), nullable=False)
    item = db.Column(db.String(255), nullable=False)
    estado = db.Column(db.String(255), nullable=False)
    titulo = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    encargado = db.Column(db.String(255))
    comentario = db.Column(db.Text)
    desarrollo = db.Column(db.String(255))

# Crear todas las tablas definidas en los modelos
db.create_all()
