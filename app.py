from flask import Flask, render_template, session, jsonify, redirect, url_for,send_from_directory
from datetime import timedelta

#Todos los py de inicio de seion
from Backend.login import login_bp, login_required, role_required
from Backend.RegistroCorreoNuevoUsuario import registrar_correo_bp 

#Todos los py relacionados con los reportes
from Backend.guardar_reporte import guardar_reporte_bp
from Backend.buscar_reportes import buscar_reportes_bp
from Backend.actualizar_reporte import actualizar_reporte_bp
from Backend.subir_imagen import subir_imagen_bp
from Backend.eliminar_registro import eliminar_registro_bp
from Backend.obtener_registro import registros_bp


#Todos los py relacioanodos con los usuarios

from Backend.guardar_cambios_usuarios import usuarios_bp
from Backend.eliminarusuario import eliminareusuario
from Backend.obtener_usuarios import obtener_usuarios
from Backend.editar_usuario import editar_usuario_bp
from Backend.estados import estados_bp
from Backend.actualizar_usuarios import usuarios_actualizar_bp

#Todos los py relacionados con los lugares e items
from Backend.CrearLugares import crearlugares_bp
from Backend.CrearItems import crearitems_bp
from Backend.EditarLugar import editar_lugar_bp
from Backend.EditarItem import editar_items_bp
from Backend.visulizar_luegareitem import visulizar_lugar_e_item_bp 

import os

UPLOAD_FOLDER = 'Backend/uploads'

secret_key = os.urandom(24)

app = Flask(__name__, template_folder="templates", static_folder="static")

# Configurar la clave secreta de la aplicación
app.secret_key = secret_key 

# Configurar la sesión para que sea permanente durante 10 minutos
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=10)

# Configurar el decorador para hacer la sesión permanente
@app.before_request
def make_session_permanent():
    session.permanent = True

# Registrar los blueprints en la aplicación Flask

#inicio de sesion 
app.register_blueprint(registrar_correo_bp)  
app.register_blueprint(login_bp)
app.register_blueprint(guardar_reporte_bp)
app.register_blueprint(buscar_reportes_bp)
app.register_blueprint(editar_usuario_bp)
app.register_blueprint(estados_bp)
app.register_blueprint(subir_imagen_bp)
app.register_blueprint(eliminar_registro_bp)
app.register_blueprint(registros_bp)
app.register_blueprint(actualizar_reporte_bp)
app.register_blueprint(usuarios_bp)
app.register_blueprint(eliminareusuario)
app.register_blueprint(crearlugares_bp)
app.register_blueprint(crearitems_bp)
app.register_blueprint(editar_lugar_bp)
app.register_blueprint(editar_items_bp)
app.register_blueprint(visulizar_lugar_e_item_bp)

# Página de menú de registro (MenuRegistro.html)
@app.route('/')
def menu_registro():
    return render_template('MenuRegistro.html')

# Página de menú principal (MenuPrincipal.html)
@app.route('/menu_principal')
@login_required
def menu_principal():
    return render_template('MenuPrincipal.html')

# Página de menú de administrador (MenuAdmin.html)
@app.route('/menu_admin')
@role_required('Admin')
@login_required
def menu_admin():
    return render_template('MenuAdmin.html')

@app.route('/menu_encargado')
@role_required('Encargado')
@login_required
def menu_encargado():
    return render_template('MenuEncargado.html')

@app.route('/obtener_usuarios/<filtro>', methods=['GET'])
def obtener_usuarios_route(filtro):
    usuarios = obtener_usuarios(filtro)
    return jsonify(usuarios)

@app.route('/uploads/<filename>')
def servir_imagen(filename):
    try:
        return send_from_directory(os.path.join(app.root_path, UPLOAD_FOLDER), filename)
    except FileNotFoundError:
        return "Imagen no encontrada", 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
