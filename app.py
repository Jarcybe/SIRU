from flask import Flask, render_template, session, jsonify, redirect, url_for
from datetime import timedelta
from Backend.login import login_bp, login_required, role_required
from Backend.crear_codigo import crear_codigo_bp
from Backend.obtener_usuarios import obtener_usuarios
from Backend.guardar_formulario import guardar_formulario_bp
from Backend.buscar_reportes import buscar_reportes_bp
from Backend.filtro import filtro_bp
from Backend.editar_usuario import editar_usuario_bp
from Backend.estados import estados_bp
from Backend.registro import registro_bp  # Importar el blueprint de registro
import os

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
app.register_blueprint(login_bp)
app.register_blueprint(crear_codigo_bp)
app.register_blueprint(guardar_formulario_bp)
app.register_blueprint(buscar_reportes_bp)
app.register_blueprint(filtro_bp)
app.register_blueprint(editar_usuario_bp)
app.register_blueprint(estados_bp)
app.register_blueprint(registro_bp)  # Registrar el blueprint de registro

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

@app.route('/obtener_usuarios/<filtro>', methods=['GET'])
def obtener_usuarios_route(filtro):
    usuarios = obtener_usuarios(filtro)
    return jsonify(usuarios)

if __name__ == '__main__':
    app.run(debug=True)
