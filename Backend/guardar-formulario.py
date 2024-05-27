from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///formulario.db'  
db = SQLAlchemy(app)

class Registro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    codigo = db.Column(db.String(50), nullable=False)
    fecha = db.Column(db.DateTime, nullable=False)
    lugar = db.Column(db.String(100), nullable=False)
    item = db.Column(db.String(100), nullable=False)
    estado = db.Column(db.String(50), nullable=False)
    titulo = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'<Registro {self.id}>'

@app.route('/guardar-formulario', methods=['POST'])
def guardar_formulario():
    datos = request.json
    nuevo_registro = Registro(
        codigo=datos['codigo'],
        fecha=datos['fecha'],
        lugar=datos['lugar'],
        item=datos['item'],
        estado=datos['estado'],
        titulo=datos['titulo'],
        descripcion=datos['descripcion']
    )
    db.session.add(nuevo_registro)
    db.session.commit()
    return jsonify({'mensaje': 'Formulario guardado exitosamente'})

if __name__ == '__main__':
    app.run(debug=True)
