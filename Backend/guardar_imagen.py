from flask import Flask, request, flash, redirect, url_for
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

# Define la carpeta donde se guardarán las imágenes
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Define las extensiones de archivo permitidas
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Función para verificar si la extensión del archivo es válida
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Ruta para manejar la solicitud POST de guardar la imagen
@app.route('/guardar_imagen', methods=['POST'])
def guardar_imagen():
    # Verifica si se ha enviado una imagen en la solicitud
    if 'imagen' not in request.files:
        flash('No se ha seleccionado ningún archivo')
        return redirect(request.url)
    
    imagen = request.files['imagen']
    
    # Verifica si se ha seleccionado un archivo
    if imagen.filename == '':
        flash('No se ha seleccionado ningún archivo')
        return redirect(request.url)
    
    # Verifica si la extensión del archivo es válida
    if imagen and allowed_file(imagen.filename):
        # Se asegura de que el nombre del archivo sea seguro
        filename = secure_filename(imagen.filename)
        # Guarda la imagen en la carpeta de uploads
        imagen.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        flash('Imagen guardada correctamente')
        return redirect(url_for('index'))
    else:
        flash('Formato de archivo no permitido')
        return redirect(request.url)

if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.run(debug=True)
