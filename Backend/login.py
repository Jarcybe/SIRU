from flask import Blueprint, request, jsonify, session, redirect, url_for
import mysql.connector
from functools import wraps
from datetime import timedelta

# Crear un blueprint para el inicio de sesión
login_bp = Blueprint('login_bp', __name__)

# Función para verificar las credenciales del usuario en la base de datos
def verificar_credenciales(correo, password):
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="siru"
    )
    cursor = connection.cursor()

    # Asegurarse de seleccionar el campo 'tipo' en la consulta
    cursor.execute("SELECT correo, tipo, nombre, estado FROM usuarios WHERE correo = %s AND password = %s", 
                   (correo, password))
    usuarios = cursor.fetchone()
    cursor.close()
    connection.close()

    if usuarios:
        if usuarios[3] == 1: 
            return usuarios
        else: 
            return None
    else:
        return None

# Ruta para manejar el inicio de sesión
@login_bp.route('/login', methods=['POST'])
def login():
    datos = request.json
    correo = datos.get('correo')
    password = datos.get('password')
    usuarios = verificar_credenciales(correo, password)
    
    if usuarios:
        # Almacenar la información del usuario en la sesión
        session['user'] = {
            'correo': usuarios[0],
            'tipo': usuarios[1],
            'nombre': usuarios[2]
        }
        # Hacer la sesión permanente
        session.permanent = True
        return jsonify({'success': True, 'usuario': session['user']})
    else:
        return jsonify({'success': False, 'message': 'Correo o contraseña incorrectos o cuenta deshabilitada'})

# Ruta para manejar el cierre de sesión
@login_bp.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login_bp.login'))

# Decorador para verificar si el usuario ha iniciado sesión
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user' not in session:
            return redirect(url_for('login_bp.login', next=request.url))
        return f(*args, **kwargs)
    return decorated_function

# Decorador para verificar el rol del usuario
def role_required(role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if 'user' not in session or session['user'].get('tipo') != role:
                return redirect(url_for('login_bp.login', next=request.url))
            return f(*args, **kwargs)
        return decorated_function
    return decorator

# Configuración para hacer la sesión permanente
@login_bp.before_app_request
def make_session_permanent():
    session.permanent = True
    session.permanent_session_lifetime = timedelta(minutes=30)  # Duración de la sesión
