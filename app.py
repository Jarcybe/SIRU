from flask import Flask, render_template, request, jsonify
from Backend.login import login_bp
from Backend.crear_codigo import crear_codigo_bp
from Backend.obtener_usuarios import obtener_usuarios
from Backend.guardar_formulario import guardar_formulario_bp
from Backend.buscar_reportes import buscar_reportes_bp
from Backend.filtro import filtro_bp
from Backend.editar_usuario import editar_usuario_bp





app = Flask(__name__, template_folder="templates", static_folder="static")

app.register_blueprint(login_bp)
app.register_blueprint(crear_codigo_bp)
app.register_blueprint(guardar_formulario_bp)
app.register_blueprint(buscar_reportes_bp)
app.register_blueprint(filtro_bp)
app.register_blueprint(editar_usuario_bp)



# Página de menú de registro (MenuRegistro.html)
@app.route('/')
def menu_registro():
    return render_template('MenuRegistro.html')

# Página de menú principal (MenuPrincipal.html)
@app.route('/menu_principal')
def menu_principal():
    return render_template('MenuPrincipal.html')

# Página de menú de administrador (MenuAdmin.html)
@app.route('/menu_admin')
def menu_admin():
    return render_template('MenuAdmin.html')

@app.route('/registro', methods=['POST'])
def registro():
    return jsonify({'mensaje': '¡Registro exitoso!'})

@app.route('/obtener_usuarios/<filtro>', methods=['GET'])
def obtener_usuarios_route(filtro):
    usuarios = obtener_usuarios(filtro)
    return jsonify(usuarios)




if __name__ == '__main__':
    app.run(debug=True)
