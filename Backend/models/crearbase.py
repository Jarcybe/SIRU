from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)


class Usuario(db.Model):
    codigo = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    contraseña = db.Column(db.String(50), nullable=False)

class Admin(db.Model):
    codigo = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    contraseña = db.Column(db.String(50), nullable=False)

class Formulario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    numero = db.Column(db.Integer, nullable=False)
    codigo_usuario = db.Column(db.Integer, nullable=False)
    fecha = db.Column(db.Date, nullable=False)
    lugar = db.Column(db.String(100), nullable=False)
    item = db.Column(db.String(100), nullable=False)
    estado = db.Column(db.String(50), nullable=False)
    titulo = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    imagen = db.Column(db.String(100), nullable=True)  


with app.app_context():
    db.create_all()
